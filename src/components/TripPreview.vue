<template>
    <div class="preview">
        <div class="trip-info pt-5">
            <vs-button gradient class="closest-trip ml-6 mb-0">
                Closest
            </vs-button>
            <v-row
                class="destination ml-6 mt-0 mr-6 pa-0 font-weight-bold"
                justify="space-between"
            >
                {{ currentTrip.destination.toUpperCase() }}
            </v-row>
            <v-row
                class="dates ml-6 mt-0 mr-6 pa-0 font-weight-bold"
                justify="space-between"
            >
                {{ currentTrip.startDate.toLocaleDateString() }} -
                {{ currentTrip.endDate.toLocaleDateString() }}
            </v-row>
            <ThemePicker></ThemePicker>
        </div>
        <v-row no-gutters align="center" justify="center" style="height: 40vh">
            <olMap class="align-center rounded-map" :precentWidth="90"></olMap>
        </v-row>
        <v-row no-gutters align="end" justify="end" style="height: 30vh">
            <vs-button
                circle
                gradient
                class="plan align-end mb-5 font-weight-medium"
            >
                Plan your trip
                <span class="material-icons md-dark">beach_access</span>
            </vs-button>
        </v-row>
    </div>
</template>

<script lang="ts">
import { tripType } from '@/utils/types/trip-type';
import { Component, Prop, Vue } from 'vue-property-decorator';
import olMap from './OlMap.vue';
import ThemePicker from './ThemePicker.vue';

@Component({
    components: {
        olMap,
        ThemePicker,
    },
})
export default class TripPreview extends Vue {
    @Prop() private currentTrip!: tripType;
}
</script>
<style scoped>
.closest-trip {
    pointer-events: none;
    height: 25px !important;
}
.destination {
    font-size: 10vh;
    overflow: hidden;
}
.dates {
    font-size: 3vh;
}
.plan {
    margin-right: -2vw;
}
.trip-info {
    height: 30vh;
    overflow: hidden;
}
</style>
