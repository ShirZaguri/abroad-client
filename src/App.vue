<template>
    <v-app>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
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
