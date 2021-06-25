import '@fortawesome/fontawesome-free/css/all.css'; // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import { generatePreset, injectGoogleFontLink } from 'vuetify/cli-plugin-utils';

Vue.use(Vuetify);

export default new Vuetify({
    theme: { dark: false },
});
