<template>
    <v-row class="ma-0 pa-0" justify="center" v-if="dates.length > 0">
        <span
            v-for="(date, index) in dates.slice(0, 2)"
            @click="selectDate(date)"
            :key="index"
            color="white"
            class="ma-1 pa-2"
        >
            {{ date | shortDate }}
        </span>
        <v-chip
            color="white"
            class="ma-2 font-weight-black"
            text-color="#5c39d0"
            @click="selectDate(dates[2])"
        >
            {{ dates[2] | shortDate }}
        </v-chip>
        <span
            v-for="(date, index) in dates.slice(3, dates.length)"
            @click="selectDate(date)"
            :key="index + 3"
            color="white"
            class="ma-1 pa-2"
        >
            {{ date | shortDate }}
        </span>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class DateSwiper extends Vue {
    @Prop() private dates!: Date[];

    mounted(): void {
        // TO DO: choose the right current day
        this.selectDate(this.dates[2]);
    }

    selectDate(date: Date): void {
        this.$emit('changeDate', date);
    }
}
</script>
