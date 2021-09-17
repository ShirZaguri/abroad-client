import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import VueTouch from 'vue-touch';

import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';

import { Map, TileLayer, OsmSource, Geoloc } from 'vuelayers';
import 'vuelayers/lib/style.css';

Vue.use(Vuesax, {});
Vue.use(VueTouch);

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
