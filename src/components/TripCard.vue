<template>
    <v-row
        v-if="trip"
        id="destination-bg"
        class="trip-card ma-4 rounded-xl justify-start"
        justify="start"
        :style="backgroundImageStyle"
    >
        <v-row v-if="closest" class="justify-end ma-0 pa-3">
            <vs-button
                gradient
                class="date-chip mb-0 font-weight-bold align-self-start"
                justify="end"
            >
                closest trip
            </vs-button>
        </v-row>
        <v-row
            class="flex-column ma-0 px-5 pt-10 pb-5 align-self-end"
            justify="start"
        >
            <h1 id="destination">
                {{ trip.destination }}
            </h1>
            <h4 id="dates">
                {{ trip.startDate | fullDate }} -
                {{ trip.endDate | fullDate }}
            </h4>
        </v-row>
    </v-row>
</template>
<script lang="ts">
import { tripType } from '@/utils/types/trip-type';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class TripCard extends Vue {
    @Prop() private trip!: tripType;
    @Prop() private closest!: boolean;

    get backgroundImageStyle(): any {
        //TODO: place default image
        return {
            background:
                'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(' +
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
#destination-bg {
    height: 60vh;
    background-repeat: no-repeat;
}

#destination {
    font-size: 7vw;
    line-height: 1.2;
}

#dates {
    font-size: 4vw;
    font-weight: normal;
    color: #cccccc;
}

#attractions-holder {
    background-color: white;
    border-radius: 30px 30px 0px 0px;
}

.date-chip {
    width: fit-content;
}

.trip-card {
    width: 65vw;
}
</style>
