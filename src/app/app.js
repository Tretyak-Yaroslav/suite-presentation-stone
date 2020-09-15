import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueAwesomeSwiper from 'vue-awesome-swiper';

import store from './stores';
import router from './components/pages/router';

import './filters';
import './components';

Vue.use(Vuelidate);
Vue.use(VueAwesomeSwiper, /* { default global options } */);

export default new Vue({
    el: '#app',
    store,
    router,
    template: '<app></app>',
    data() {
        return {}
    },
});