import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';

import VueLayers from 'vuelayers';
import 'vuelayers/lib/style.css';

Vue.use(Vuesax, {});

Vue.use(VueLayers);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
