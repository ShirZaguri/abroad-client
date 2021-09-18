import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Plan from '@/views/Plan.vue';
import Trips from '@/views/Trips.vue';
import TripMobile from '@/views/TripMobile.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Trips',
        component: Trips,
    },
    {
        path: '/trips/:id',
        name: 'Plan',
        component: Plan,
        props: true,
    },
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

export default router;
