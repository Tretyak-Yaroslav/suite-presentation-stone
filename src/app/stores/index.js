import Vue from 'vue';
import Vuex from 'vuex';

import {ParentApiStore} from './parent-api';
import {VillaStore} from './villa';

Vue.use(Vuex);

export default new Vuex.Store({
    state: { },
    actions: {
        async initState(context){
            await context.dispatch('ParentApiStore/initState').catch(err => {console.error(err)});
        },

        async initDataReceived(context, payload) {
            await context.dispatch('VillaStore/initState', payload).catch(err => {console.error(err)});
        },
    },
    modules: {
        ParentApiStore,
        VillaStore,
    },
});