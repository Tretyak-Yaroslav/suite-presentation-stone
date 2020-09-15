import Vue from 'vue';
import {required, email} from 'vuelidate/lib/validators';

import template from './index.html';

export default Vue.component('form-sharing', {
    template,
    validations: {
        form: {
            email: {required, email},
        }
    },
    data() {
        return {
            loading: false,
            form: {
                email: null,
            },
            touched: false,
        }
    },
    beforeDestroy() {
        this.$root.$off('sharing-response', this.sharingResponse);

        this.$store.dispatch('ParentApiStore/sharingCancel');
    },
    mounted() {
        this.mergeClientData();

        this.$root.$on('sharing-response', this.sharingResponse);
    },
    computed: {
        client() {
            if (this.$store.state.ParentApiStore.initData) {
                if (this.$store.state.ParentApiStore.initData.client) {
                    return this.$store.state.ParentApiStore.initData.client;
                }
            }
            return null;
        },
        villasMarked() {
            return this.$store.state.VillaStore.marked;
        },
        villas() {
            let villas = this.villasMarked.map(villaNum => {
                return this.$store.getters['VillaStore/villa'](villaNum);
            });

            return villas;
        },
    },
    methods: {
        mergeClientData() {
            if (!this.client) return;

            if (this.client.email1 && this.client.email1_type === 'home') {
                this.form.email = this.client.email1;
                return;
            }

            if (this.client.email2 && this.client.email2_type === 'home') {
                this.form.email = this.client.email2;
                return;
            }

            if (this.client.email1) {
                this.form.email = this.client.email1;
                return;
            }
        },

        villaRemove(index) {
            let villaNum = this.villasMarked[index];
            this.$store.dispatch('VillaStore/markToggle', villaNum);
        },

        validate() {
            this.touched = true;
            this.$v.form.$touch();
            return !this.$v.form.$invalid;
        },
        submit() {
            if (!this.validate()) return;

            let placements_ids = this.villas.map(villa => villa.id);

            let payload = Object.assign({
                placements_ids
            }, this.form);

            if (this.client) {
                if (this.client.id) {
                    payload.client_id = this.client.id;
                } else if (this.client.id_local) {
                    payload.client_id_local = this.client.id_local;
                }
            }

            this.loading = true;
            this.$store.dispatch('ParentApiStore/sharingRequest', payload);
        },

        sharingResponse(body) {
            this.loading = false;

            if (!body || !body.success) {
                return;
            }

            console.log('Sharing success');

            this.$emit('complete');
        },
    }
});