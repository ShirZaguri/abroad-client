import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import './plugins/filters/dates';

import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';

import { Map, TileLayer, OsmSource, Geoloc } from 'vuelayers';
import 'vuelayers/lib/style.css';

import 'swiper/css/swiper.css';
// TODO: decide wether conf is needed or not
// import VueAwesomeSwiper from 'vue-awesome-swiper';
// Vue.use(VueAwesomeSwiper);

// import 'swiper/components/effect-coverflow/effect-coverflow.scss';
// import 'swiper/src/components/effect-coverflow/effect-coverflow';

// import { Swiper as SwiperClass, EffectCoverflow } from 'swiper/js/swiper.esm';
// import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
// Vue.use(getAwesomeSwiper(SwiperClass));

// SwiperClass.use([EffectCoverflow]);

Vue.use(Vuesax, {});

Vue.use(Map);
Vue.use(TileLayer);
Vue.use(OsmSource);
Vue.use(Geoloc);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
