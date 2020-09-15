import Vue from 'vue';

import template from './index.html';

export default Vue.component('app', {
    template,
    data() {
        return {
            builds: [],
        }
    },
    created() {

    },
    mounted() {
        this.$store.dispatch('initState').catch(err => {console.error(err)});

        this.$store.dispatch('ParentApiStore/log', {
            target: 'init',
        });
    },
    computed: {
        platform() {
            return this.$store.state.ParentApiStore.platform;
        },
        initData() {
            return this.$store.state.ParentApiStore.initData;
        },
    },
    watch: {
        initData(newVal) {
            if (newVal.builds) {
                this.builds = newVal.builds;
            }
        },
        $route: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    this.$store.dispatch('ParentApiStore/routeLog');
                });
            },
        },
    },
    methods: {
        startBuild(build) {
            this.$store.dispatch('ParentApiStore/touchBuild', build.id).catch(err => {console.error(err)});
        },
        goBack() {
            this.$store.dispatch('ParentApiStore/goBack').catch(err => {console.error(err)});
        },
    },
});