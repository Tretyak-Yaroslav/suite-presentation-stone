import Vue from 'vue';

import template from './index.html';

export default Vue.component('park-page', {
    template,
    data() {
        return {
            isVisibleOverlay: false,
            introTitleShow: true,
            navArrowsVisible: false,
            arrowsTimeout: null,
            mode: 1,
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
            // swiperOption3: {
            //     effect: 'fade',
            //     pagination: {
            //         clickable: true,
            //         el: '.swiper-pagination'
            //     }
            // },
            activeLink: 1,
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
    },
    computed: {

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
        initModeOne(){
            this.mode = 1;
        },
        initModeTwo(){
            this.mode = 2;
        },
        initModeThree(){
            this.mode = 3;
        },
    }
});