import Vue from 'vue';

import template from './index.html';

export default Vue.component('park-page', {
    template,
    data() {
        return {

            navArrowsVisible: false,
            arrowsTimeout: null,
        }
    },
    beforeDestroy() {
        window.document.removeEventListener('mousemove', this.mouseEventHandler, false);
    },
    mounted() {
        setTimeout(() => {

            window.document.addEventListener('mousemove', this.mouseEventHandler, false);
        }, 1000);

    },
    computed: {

    },
    methods: {
        mouseEventHandler() {
            this.navArrowsVisible = true;

            clearTimeout(this.arrowsTimeout);
            this.arrowsTimeout = setTimeout(() => {
                this.navArrowsVisible = false;
            }, 1000);
        },
    }
});