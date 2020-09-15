import Vue from 'vue';

import template from './index.html';
import {Scene} from './scene';

export default Vue.component('panorama', {
    template,
    props: {
        src: {type: String},
        angle: {
            type: Number,
            default: 0,
        },
        points: {
            type: Array
        }
    },
    data() {
        return {
            loading: false,
            name: '',
            name1: '',
            name2: '',
            name3: '',
            name4: '',
            name5: '',
            time: '',
            distance: '',
            openedModal: false

        }
    },
    beforeDestroy() {
        this.scene.dispose();
        this.scene = null;
    },
    mounted() {
        this.loading = true;
        this.scene = new Scene(this.$refs.canvas, this.$el, this.src, this.angle, this.points);
        this.scene.onLoad = () => {
            this.loading = false;
        }
    },
    watch: { 
        // myPoints[0].marker.visible = false

        // по кнопке 3д-тур ивент как на Выйти в меню
        // в файле есть хендлер по нажатию
        points (newVal, oldVal) {
            this.scene.filterPoints(newVal)
            // this.scene = new Scene(this.$refs.canvas, this.$el, this.src, this.angle, newVal);
        }
    },
    methods: {
        openLocationInfoModal (e) {
            const locationData = this.scene.onDocumentMouseDown(e) || {}
            
            if (Object.keys(locationData).length > 0) {
                this.openedModal = true
                this.setModalData(locationData)
            }
        },

        setModalData (locationData) {
            // console.log(locationData)
            const { Name, Area, Time, Adress, Name1 = '', Name2 = '', Name3 = '', Name4 = '', Name5 = '', } = locationData
            this.name = Name
            this.time = Time
            this.distance = Area

            this.name1 = Name1
            this.name2 = Name2
            this.name3 = Name3
            this.name4 = Name4
            this.name5 = Name5
        },

        closeLocationInfoModal () {
            this.openedModal = false
        }
    }
})