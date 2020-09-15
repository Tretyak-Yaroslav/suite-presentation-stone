import Vue from 'vue';

import template from './index.html';

export default Vue.component('video-html5', {
    template,
    props: {
        src: {type: String},
        poster: {type: String},
        loop: {type: Boolean},
        autoplay: {type: Boolean, default: false},
        muted: {type: Boolean, default: true},
        fit: {type: String},
    },
    data() {
        return {

        }
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {},
    watch: {
        src(newVal) {
            this.$refs.videoElem.load();
        },
    },
    methods: {
        init() {
            let video = this.$refs.videoElem;

            this.$emit('init', video);
        },
    }
});