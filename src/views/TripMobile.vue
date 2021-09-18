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
                    {{ tripDates[0] }} -
                    {{ tripDates.slice(-1)[0] }}
                </vs-button>
            </div>
        </v-row>
        <DateSwiper :dates="fixedTripDates" />
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
                    v-for="(attraction, index) in fixedAttractions"
                    :key="index"
                    :attraction="attraction"
                    :now="attraction.attraction.name === 'Shirs Museum'"
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

@Component({
    components: {
        Temperature,
        AttractionItem,
        DateSwiper,
    },
})
export default class TripMobile extends Vue {
    @Prop() private trip!: tripType;

    get tripDates(): string[] {
        return this.trip.startDate
            ? this.getDatesBetween(this.trip.startDate, this.trip.endDate)
            : [];
    }

    get fixedTripDates(): string[] {
        return this.trip.startDate
            ? this.tripDates.map((date: string) => date.slice(0, -5))
            : [];
    }

    getDatesBetween(startDate, endDate): string[] {
        const datesRange: string[] = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
            let day = ('0' + currentDate.getDate()).slice(-2);
            let date = [day, month, currentDate.getFullYear()].join('/');
            datesRange.push(date);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return datesRange;
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
