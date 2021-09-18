<template>
    <v-row class="ma-0 pa-0" justify="center" v-if="dates.length > 0">
        <span
            v-for="date in dates.slice(0, 2)"
            :key="date"
            color="white"
            class="ma-1 pa-2"
        >
            {{ date }}
        </span>
        <v-chip
            color="white"
            class="ma-2 font-weight-black"
            text-color="#5c39d0"
        >
            {{ dates[2] }}
        </v-chip>
        <span
            v-for="date in dates.slice(3, dates.length)"
            :key="date"
            color="white"
            class="ma-1 pa-2"
        >
            {{ date }}
        </span>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class DateSwiper extends Vue {
    @Prop() private dates!: string[];
}
</script>

<style>
</style>
