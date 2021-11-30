<template>
    <v-row justify="center" class="pb-2">
        <v-col cols="6" class="ma-0 pa-0">
            <Temperature tag="day" :temperature="20" :mode="'snow'" />
        </v-col>
        <v-divider class="my-6" vertical color="white"></v-divider>
        <v-col cols="6" class="ma-0 pa-0">
            <Temperature tag="night" :temperature="3" :mode="'storm'" />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Temperature from '@/components/Temperature.vue';

@Component({ components: { Temperature } })
export default class TemperatureDayOverview extends Vue {}
</script>
