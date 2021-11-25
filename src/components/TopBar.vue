<template>
    <v-row
        justify="space-between"
        class="countdown_bg ma-0 px-5 py-4"
        align="center"
    >
        <span class="material-icons">arrow_back_ios_new</span>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class TopBar extends Vue {}
</script>

<style scoped>
.countdown_bg {
    background: linear-gradient(to right, #195bff, #6f42ff 40%);
}
</style>
