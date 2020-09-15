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
            speed: 2000,
            swiperOption1: {
                effect: 'fade',
                pagination: {
                    clickable: true,
                    el: '.swiper-pagination-common'
                },
                navigation: {
                    nextEl: '.swiper-button-next-common',
                    prevEl: '.swiper-button-prev-common'
                }
            },
            isVideoVisible: false,
            videoPlay: false,
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
        openVideo () {
            this.chacngValue('isVideoVisible', true)
        },
        closeVideo () {
            this.$refs.locationVideo.pause()
            this.chacngValue('isVideoVisible', false)
        },
        startVideo () {
            this.chacngValue('videoPlay', true)
            this.$refs.locationVideo.play()
        },

        chacngValue (name, value) {
            this[name] = value
        },

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
    }
});