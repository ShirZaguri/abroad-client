<template>
    <div>
        <v-row
            id="destination-bg"
            class="pt-6 ma-0"
            justify="center"
            align="center"
            :style="backgroundImageStyle"
        >
            <div class="d-flex flex-column text-center align-center">
                <h1 id="destination-title">
                    {{ trip.destination }}
                </h1>
                <vs-button gradient class="date-chip mb-0 font-weight-bold">
                    {{ fixedTripDates[0] }} -
                    {{ fixedTripDates.slice(-1)[0] }}
                </vs-button>
            </div>
        </v-row>
        <DateSwiper :dates="tripDates" @changeDate="changeCurrentDate" />
        <v-row id="temperature-holder" class="ma-0 mt-2 pa-0" justify="center">
            <v-col cols="5" class="ma-0 pa-0">
                <Temperature tag="day" :temperature="20" />
            </v-col>
            <v-divider class="my-6" vertical color="white"></v-divider>
            <v-col cols="5" class="ma-0 pa-0">
                <Temperature tag="night" :temperature="3" />
            </v-col>
        </v-row>
        <v-row class="ma-0 pa-0" justify="center" id="attractions-holder">
            <v-col cols="12">
                <AttractionItem
                    v-for="(attraction, index) in sortedAttractions"
                    :key="index"
                    :attraction="attraction"
                    :now="attraction._id === closestAttractionId"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { tripAttractionType } from '@/utils/types/trip-attraction-type';
import { tripType } from '@/utils/types/trip-type';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AttractionItem from '../components/AttractionItem.vue';
import DateSwiper from '../components/DateSwiper.vue';
import Temperature from '../components/Temperature.vue';
import DateService from '@/services/dateService';

@Component({
    components: {
        Temperature,
        AttractionItem,
        DateSwiper,
    },
})
export default class TripMobile extends Vue {
    @Prop() private trip!: tripType;

    private currentDay: Date = new Date();

    get tripDates(): Date[] {
        return this.trip.startDate
            ? DateService.datesBetween(this.trip.startDate, this.trip.endDate)
            : [];
    }

    get fixedTripDates(): string[] {
        return this.trip.startDate
            ? DateService.datesConvert(this.tripDates, 'full')
            : [];
    }

    get todaysAttractions(): tripAttractionType[] {
        return this.fixedAttractions.filter((attraction) =>
            DateService.datesAreOnSameDay(
                attraction.details.date,
                this.currentDay,
            ),
        );
    }

    get sortedAttractions(): tripAttractionType[] {
        return this.todaysAttractions.sort(
            (a: tripAttractionType, b: tripAttractionType) => {
                return Number(a.details.date) - Number(b.details.date);
            },
        );
    }

    get closestAttractionId(): string {
        const today = Number(new Date());
        const previousAttractions: tripAttractionType[] =
            this.sortedAttractions.filter(
                (attraction) => Number(attraction.details.date) < today,
            );
        return previousAttractions[previousAttractions.length - 1]._id;
    }

    get backgroundImageStyle(): any {
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

    get fixedAttractions(): tripAttractionType[] {
        return this.trip.attractions.map((atr) => {
            atr.details.done = false;
            return atr;
        });
    }

    changeCurrentDate(newDate: Date): void {
        this.currentDay = newDate;
    }
}
</script>
<style scoped>
#destination-bg {
    height: 25vh;
    background-repeat: no-repeat;
}

#destination-title {
    font-size: 13vw;
    line-height: 1.2;
}

#attractions-holder {
    background-color: white;
    border-radius: 30px 30px 0px 0px;
}

.date-chip {
    width: fit-content;
}
</style>
