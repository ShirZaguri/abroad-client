import TripsMobile from '@/views/TripsMobile.vue';
import TripMobile from '@/views/TripMobile.vue';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Trips',
        component: TripsMobile,
    },
    {
        path: '/trips/:id',
        name: 'Plan',
        component: TripMobile,
        props: true,
    },
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

export default router;
