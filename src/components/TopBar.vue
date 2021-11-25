<template>
    <v-row
        justify="space-between"
        class="countdown_bg ma-0 px-5 py-3"
        align="center"
    >
        <span class="material-icons" @click="goBack">arrow_back_ios_new</span>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class TopBar extends Vue {
    goBack(): void {
        this.$router.back();
    }
}
</script>

<style scoped>
.countdown_bg {
    background: linear-gradient(to right, #195bff, #6f42ff 80%);
}
</style>
