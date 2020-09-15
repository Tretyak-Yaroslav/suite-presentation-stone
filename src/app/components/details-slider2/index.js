import Vue from 'vue';

import template from './index.html';

export default Vue.component('details-slider2', {
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        isOpenModal: {
            type: Boolean,
            default: false
        },
        isSelectedLeft: {
            type: Boolean,
            default: false
        }
    },
    template,
    data() {
        const isOpen = this.isOpen
        return {
            open: isOpen,
            swiper: null,
            visible: 2,
            swiperOption: {
                mousewheel: {
                    invert: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: !false,
                }
            }
        }
    },
    mounted() {
        this.swiper = this.$refs.swiper.swiper;
        if (this.$children[0] && this.$children[0].$children.length === 1) {
            this.swiper.destroy(true, true);
        }
    },
    computed: {
        activeSlide() {
            if (!this.swiper) return null;
            return this.swiper.activeIndex;
        },
    },
    methods: {
        toggle(value) {
            this.open = typeof value == 'boolean' ? value : !this.open;
            this.$emit('toggled', this.open);
        },
        slideTo(index) {
            this.swiper.slideTo(index, 300);
        },
        slidePrev() {
            this.swiper.slidePrev(300);
        },
        slideNext() {
            this.swiper.slideNext(300);
        },
    },
});