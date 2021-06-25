<template>
    <v-row no-gutters class="d-block">
        <v-col cols="5" class="side float-left" fixed>
            <slot name="left"></slot>
        </v-col>
        <v-col cols="7" class="main float-right">
            <slot name="right"></slot>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class DividedScreen extends Vue {}
</script>

<style>
.theme--dark .side {
    background-color: var(--side-dark-background);
}

.theme--dark .main {
    background-color: var(--main-dark-background);
}
.side {
    position: fixed;
}
</style>
