import Vue from 'vue';

import template from './index.html';

export default Vue.component('park-page', {
    template,
    data() {
        return {
            introTitleShow: true,
            loading: false,
            navArrowsVisible: false,
            arrowsTimeout: null,
            isVisibleOverlay: false,
            swiperOption1: {
                effect: 'fade',
                speed: 2000,
                pagination: {
                    clickable: true,
                    el: '.swiper-pagination-common'
                },
                navigation: {
                    nextEl: '.swiper-button-next-common',
                    prevEl: '.swiper-button-prev-common'
                }
            },
            // buildInternalName: 'stone_exterior',
            // buildId: null,
            // panoTourInternalName: 'stonehedge_cameo_pano_exterior',
            // panoTourId: null
        }
    },
    
    beforeDestroy() {
        window.document.removeEventListener('mousemove', this.mouseEventHandler, false);
    },
    mounted() {
        setTimeout(() => {
            this.introTitleShow = false;

            window.document.addEventListener('mousemove', this.mouseEventHandler, false);
        }, 1000);

        // this.findBuild();
        // this.findPanoTour();
    },
    computed: {
        // vrTourMode() {
        //     return this.$store.state.ParentApiStore.initData.vrTourMode;
        // }
    },
    methods: {
        slideChanged ( ) {
            this.isVisibleOverlay = true

            setTimeout(() => {
                this.isVisibleOverlay = false
            }, 800)
        },
        
        mouseEventHandler() {
            this.navArrowsVisible = true;

            clearTimeout(this.arrowsTimeout);
            this.arrowsTimeout = setTimeout(() => {
                this.navArrowsVisible = false;
            }, 1000);
        },

        // async findBuild() {
        //     let builds = this.$store.state.ParentApiStore.initData ? this.$store.state.ParentApiStore.initData.builds : null;
        //     if (!builds || !builds.length) return null;
        //     let build = builds.find(item => item.internal_name === this.buildInternalName);
        //     if (!build || !build.id) return null;
        //     this.buildId = build.id;
        // },

        // async findPanoTour() {
        //     let panoTours = this.$store.state.ParentApiStore.initData ? this.$store.state.ParentApiStore.initData.panoTours : null;
        //     if (!panoTours || !panoTours.length) return null;
        //     let panoTour = panoTours.find(item => item.internal_name === this.panoTourInternalName);
        //     if (!panoTour || !panoTour.id) return null;
        //     this.panoTourId = panoTour.id;
        // },

        // startVrTour() {
        //     if (this.vrTourMode === 'light') {
        //         if (!this.panoTourId) return;
        //         this.$store.dispatch('ParentApiStore/touchPanoTour', this.panoTourId);
        //         return;
        //     }
        //     if (!this.buildId) return;
        //     this.$store.dispatch('ParentApiStore/touchBuild', this.buildId);
        //     this.loading = true;
        //     setTimeout(() => {
        //         this.loading = false;
        //     }, 10000);
        // },

        // handleTour () {
        //     this.startVrTour()
        // }
    }
});