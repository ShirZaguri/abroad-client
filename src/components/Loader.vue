<template>
    <v-overlay opacity="1" :value="true">
        <img src="../assets/van-loader.gif" width="100%" />
    </v-overlay>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Loding extends Vue {}
</script>
