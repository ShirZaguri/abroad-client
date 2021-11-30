<template>
    <div id="main_holder">
        <div id="trip-info-holder">
            <vs-button id="add-attraction-btn" gradient circle icon>
                <v-icon size="15" color="white" class="pa-1">
                    fas fa-plus
                </v-icon>
            </vs-button>

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
            <DateSwiper
                :dates="tripDates"
                @date-changed="dateChanged"
            ></DateSwiper>
            <TemperatureDayOverview class="px-1 pt-2" />
        </div>
        <Attractions :attractions="trip.attractions" :currentDay="currentDay" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Provide, Vue } from 'vue-property-decorator';
import { tripType } from '@/utils/types/trip-type';
import AttractionItem from '../components/AttractionItem.vue';
import DateSwiper from '@/components/DateSwiper.vue';
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

    private currentDay: Date = new Date();

    @Provide('tripDates')
    get tripDates(): Date[] {
        return this.trip.startDate
            ? DateService.datesBetween(this.trip.startDate, this.trip.endDate)
            : [];
    }

    dateChanged(index: number): void {
        this.currentDay = this.tripDates[index];
    }
    get backgroundImageStyle(): { background: string; backgroundSize: string } {
        //TODO: place default image
        return {
            background:
                'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 100)), url(' +
                require(`../assets/images/${
                    this.trip ? this.trip.img : 'zans'
                }.jpg`) +
                ')',
            backgroundSize: 'cover',
        };
    }
}
</script>
<style scoped>
#main_holder {
    height: 100%;
}

#trip-info-holder {
    height: 40vh;
}

#destination-bg {
    height: 18vh;
    background-repeat: no-repeat;
}

#destination-title {
    font-size: 13vw;
    line-height: 1.2;
}

#add-attraction-btn {
    position: absolute;
    height: 6.5vh;
    width: 6.5vh;
    bottom: 7vh;
    right: 5vh;
}

#plus {
    font-size: 3vh;
}

#attractions-holder {
    height: 60vh;
}

.date-chip {
    width: fit-content;
}
</style>
