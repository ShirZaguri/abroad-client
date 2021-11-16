<template>
    <div id="main_holder">
        <v-row
            id="destination-bg"
            class="ma-0 pa-5"
            justify="center"
            align="center"
        >
            <div class="d-flex flex-column text-center align-center">
                <h1 id="destination-title">
                    {{ trip.destination }}
                </h1>
            </div>
        </v-row>
        <DateSwiper :dates="tripDates" @changeDate="changeCurrentDate" />
        <TemperatureDayOverview class="px-1" />

        <!-- <v-row
            class="ma-0 pa-0 pt-4 scrollable"
            justify="center"
            id="attractions-holder"
        > -->
        <Attractions :attractions="trip.attractions" :currentDay="currentDay" />
        <!-- </v-row> -->
    </div>
</template>

<script lang="ts">
import { tripType } from '@/utils/types/trip-type';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AttractionItem from '../components/AttractionItem.vue';
import DateSwiper from '../components/DateSwiper.vue';
import Temperature from '../components/Temperature.vue';
import Attractions from '@/components/Attractions.vue';
import TemperatureDayOverview from '@/components/TemperatureDayOverview.vue';
import DateService from '@/services/dateService';

@Component({
    components: {
        Temperature,
        AttractionItem,
        DateSwiper,
        TemperatureDayOverview,
        Attractions,
    },
})
export default class TripMobile extends Vue {
    @Prop() private trip!: tripType;
    private showExpand = false;

    private currentDay: Date = new Date();

    get tripDates(): Date[] {
        return this.trip.startDate
            ? DateService.datesBetween(this.trip.startDate, this.trip.endDate)
            : [];
    }

    changeCurrentDate(newDate: Date): void {
        this.currentDay = newDate;
    }
}
</script>
<style scoped>
#main_holder {
    height: 100%;
}

#destination-bg {
    height: 20vh;
    background-repeat: no-repeat;
}

#destination-title {
    font-size: 13vw;
    line-height: 1.2;
}

#attractions-holder {
    height: 60vh;
}

.scrollable {
    overflow: scroll;
}

.date-chip {
    width: fit-content;
}
</style>
