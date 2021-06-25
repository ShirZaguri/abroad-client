<template>
    <div class="center con-switch mt-4 ml-4 mr-3 mb-3">
        <vs-switch
            color="#141417"
            v-model="$vuetify.theme.dark"
            v-bind:class="{
                active: `${$vuetify.theme.dark ? 'darkTheme' : 'lightTheme'}`,
            }"
            @click="toggleTheme"
        >
            <template>
                <span v-if="$vuetify.theme.dark" class="material-icons md-dark">
                    light_mode
                </span>

                <span v-else class="material-icons md-light">dark_mode</span>
            </template>
        </vs-switch>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ThemePicker extends Vue {
    //TODO: move all page

    toggleTheme(): void {
        if (this.$vuetify.theme.dark) {
            localStorage.setItem('vsTheme', 'light');
        } else {
            localStorage.setItem('vsTheme', 'dark');
        }

        this.$vs.setTheme(localStorage.getItem('vsTheme'));
    }
}
</script>
<style scoped>
.material-icons.md-dark {
    color: #ffff;
    font-size: 18px !important;
}
.material-icons.md-dark.md-inactive {
    color: rgba(0, 0, 0, 0.26);
}

.material-icons.md-light {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.5) !important;
}
.material-icons.md-light.md-inactive {
    color: rgba(255, 255, 255, 0.3);
    background-color: white;
}

.con-switch {
    width: 60px;
    height: 32px;
    border-radius: 20px;
    box-shadow: inset 0 0 4px 0 rgb(0 0 0 / 5%);
}
</style>
