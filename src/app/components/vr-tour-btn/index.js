import Vue from 'vue';

import template from './index.html';

export default Vue.component('vr-tour-btn', {
    template,
    data () {
        return {
            loading: false,
            buildInternalName: 'stone_exterior',
            buildId: null,
            panoTourInternalName: 'stonehedge_cameo_pano_exterior',
            panoTourId: null
        }
    },
    mounted () {
        this.findBuild();
        this.findPanoTour();
    },
    computed: {
        vrTourMode() {
            return this.$store.state.ParentApiStore.initData.vrTourMode;
        }
    },
    methods: {
        async findBuild() {
            let builds = this.$store.state.ParentApiStore.initData ? this.$store.state.ParentApiStore.initData.builds : null;
            if (!builds || !builds.length) return null;
            let build = builds.find(item => item.internal_name === this.buildInternalName);
            if (!build || !build.id) return null;
            this.buildId = build.id;
        },

        async findPanoTour() {
            let panoTours = this.$store.state.ParentApiStore.initData ? this.$store.state.ParentApiStore.initData.panoTours : null;
            if (!panoTours || !panoTours.length) return null;
            let panoTour = panoTours.find(item => item.internal_name === this.panoTourInternalName);
            if (!panoTour || !panoTour.id) return null;
            this.panoTourId = panoTour.id;
        },

        startVrTour() {
            if (this.vrTourMode === 'light') {
                if (!this.panoTourId) return;
                this.$store.dispatch('ParentApiStore/touchPanoTour', this.panoTourId);
                return;
            }
            if (!this.buildId) return;
            this.$store.dispatch('ParentApiStore/touchBuild', this.buildId);
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 10000);
        },

        handleTour () {
            console.log('3D-tour')
            this.startVrTour()
        }
    }
})