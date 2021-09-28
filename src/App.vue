<template>
    <v-app>
        <v-main>
            <router-view />
            <loader v-if="loading"></loader>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Loader from '@/components/Loader.vue';
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from 'vuex-class';
const loading = namespace('loading');

@Component({
    components: {
        Loader,
    },
})
export default class App extends Vue {
    @loading.State
    public loading!: boolean;

    created(): void {
        let vsTheme = localStorage.getItem('vsTheme');

        if (!vsTheme) {
            localStorage.setItem('vsTheme', 'dark');
        }

        if (vsTheme == 'light') {
            this.$vuetify.theme.dark = false;
        } else {
            this.$vuetify.theme.dark = true;
        }

        this.$vs.setTheme(vsTheme);
    }
}
</script>
