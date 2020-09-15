import Vue from 'vue';
import VueRouter from 'vue-router';
import Init from './init-page';
import About from './about-page';
import Location from './location-page';
import Architecture from './architecture-page';
import Lobby from './lobby-page';
import LaungeHall from './launge-hall-page'
import RoofTopGarden from './roof-top-garden-page'
import RoofTopBar from './roof-top-bar' 
import Office from './office' 
import Ritail from './ritail-page'
import Parking from './parking-page'
import OfficeIntro from './office-intro-page'
import ParkingIntro from './parking-intro-page'
import RitailIntro from './ritail-intro-page'
import SelectedObjects from './selected-objects';


Vue.use(VueRouter);

const routes = [
    {
        component: Init,
        name: 'init',
        path: '/init',
    },
    {
        component: About,
        name: 'about',
        path: '/about',
    },
    {
        component: Location,
        name: 'location',
        path: '/location',
    },
    {
        component: Architecture,
        name: 'architecture',
        path: '/architecture',
    },
    {
        component: Lobby,
        name: 'lobby',
        path: '/lobby',
    },
    {
        component: LaungeHall,
        name: 'laungehall',
        path: '/laungehall',
    },
    {
        component: RoofTopGarden,
        name: 'rooftopgarden',
        path: '/roof-top-garden',
    },
    {
        component: RoofTopBar,
        name: 'rooftopbar',
        path: '/roof-top-bar',
    },
    {
        component: Office,
        name: 'office',
        path: '/office',
    },
    {
        component: OfficeIntro,
        name: 'office-intro',
        path: '/office/office-intro',
    },
    {
        component: Ritail,
        name: 'ritail',
        path: '/ritail',
    },
    {
        component: Parking,
        name: 'parking',
        path: '/parking',
    },
    {
        component: ParkingIntro,
        name: 'parking-intro',
        path: '/parking/parking-intro',
    },
    {
        component: RitailIntro,
        name: 'ritail-intro',
        path: '/ritail/ritail-intro'
    },
    {
        component: SelectedObjects,
        name: 'selected-objects',
        path: '/selected',
    },
    { 
        path: '*', 
        redirect: to => {
            return {name: 'init'};
        }
    },
];

const router = new VueRouter({
    routes: routes,
    mode: 'hash',
    base: '/',
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
});

export default router;
