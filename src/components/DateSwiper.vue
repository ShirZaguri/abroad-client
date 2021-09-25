<template>
    <v-row class="ma-0 pa-0" justify="center" v-if="dates.length > 0">
        <span
            v-for="(date, index) in fixedTripDates.slice(0, 2)"
            @click="selectDate(dates[index])"
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
            @click="selectDate(dates[2])"
        >
            {{ fixedTripDates[2] }}
        </v-chip>
        <span
            v-for="(date, index) in fixedTripDates.slice(3, dates.length)"
            @click="selectDate(dates[index + 3])"
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
import DateService from '@/services/dateService';

@Component({})
export default class DateSwiper extends Vue {
    @Prop() private dates!: Date[];

    get fixedTripDates(): string[] {
        return this.dates ? DateService.datesConvert(this.dates, 'short') : [];
    }

    selectDate(date) {
        this.$emit('changeDate', date);
    }
}
</script>

<style>
</style>
