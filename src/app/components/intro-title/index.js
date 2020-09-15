import Vue from 'vue';

import template from './index.html'

export default Vue.component('intro-title', {
    template,
    props: {
        title: {
            type: String,
            default: ''
        }
    },

    data () {
        return {
            introTitleShow: true
        }
    },
    mounted () {
        this.introTitleShow = false
    }
});