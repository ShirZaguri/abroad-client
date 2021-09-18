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
                    {{ trip.startDate.toLocaleDateString() }} -
                    {{ trip.endDate.toLocaleDateString() }}
                </vs-button>
            </div>
        </v-row>
        <v-row class="ma-0 pa-0" justify="center">
            <span
                v-for="date in dates.slice(2)"
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
                {{ dates[0] }}
            </v-chip>
            <span
                v-for="date in dates.slice(2)"
                :key="date"
                color="white"
                class="ma-1 pa-2"
            >
                {{ date }}
            </span>
        </v-row>
        <v-row id="temperature-holder" class="ma-0 mt-2 pa-0" justify="center">
            <v-col cols="5" class="ma-0 pa-0">
                <Temperature :tag="'day'" :temperature="'5'" />
            </v-col>
            <v-divider class="my-6 mx-1" vertical color="white"></v-divider>
            <v-col cols="5" class="ma-0 pa-0">
                <Temperature :tag="'night'" :temperature="'-3'" />
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
import { Component, Vue, Prop } from 'vue-property-decorator';
import Temperature from '../components/Temperature.vue';
import AttractionItem from '../components/AttractionItem.vue';
import { tripType } from '@/utils/types/trip-type';
import { tripAttractionType } from '@/utils/types/trip-attraction-type';
import { util } from 'vue/types/umd';

@Component({
    components: {
        Temperature,
        AttractionItem,
    },
})
export default class TripMobile extends Vue {
    @Prop() private trip!: tripType;

    private dates = ['08/12', '09/12', '10/12', '11/12'];

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
}

#attractions-holder {
    background-color: white;
    border-radius: 30px 30px 0px 0px;
}

.date-chip {
    width: fit-content;
}
</style>
