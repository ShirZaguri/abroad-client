import Trips from '@/views/Trips.vue';
import TripOverview from '@/views/TripOverview.vue';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Trips',
        component: Trips,
    },
    {
        path: '/trips/:id',
        name: 'Overview',
        component: TripOverview,
        props: true,
    },
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

export default router;
