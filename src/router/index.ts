import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Plan from '../views/Plan.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
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
});

export default router;
