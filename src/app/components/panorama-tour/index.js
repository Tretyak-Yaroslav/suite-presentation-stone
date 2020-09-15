import Vue from 'vue';

import template from './index.html';
import {Scene} from './scene';

export default Vue.component('panorama-tour', {
    template,
    props: {
        tour: {type: Object},
    },
    data() {
        return {
            loading: false,
        }
    },
    beforeDestroy() {
        this.scene.dispose();
        this.scene = null;
    },
    mounted() {
        this.loading = true;

        this.scene = new Scene(this.$refs.canvas, this.$el, this.tour);
        // this.scene.actionPlane.material.opacity = 1;
        // this.scene.transitionTriggerPrototype.material.opacity = 1;
        // this.scene.cursorDebug = true;

        this.scene.ready = () => {
            this.loading = false;
        };

        document.addEventListener('keypress', event => {
            if (event.code === 'Space'){
                console.log(this.scene.getTriggerCoordinatesByCursor());
            }
        })
    },
    methods: {

    }
});