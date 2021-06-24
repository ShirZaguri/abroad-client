<template>
    <div class="preview">
        <div class="trip-info pt-5">
            <vs-button
                gradient
                class="closest-trip ml-6 mb-0 mt-o"
                style="height: 10vh"
            >
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
        <div class="d-flex align-center" style="height: 50vh">
            <ol-map class="map align-center" style="width: 100%"></ol-map>
        </div>
        <div class="d-flex align-end justify-end" style="height: 20vh">
            <vs-button
                flat
                circle
                gradient
                :active="active == 0"
                @click="active = 0"
                class="plan align-end mb-5 font-weight-medium"
            >
                Plan your trip
                <span class="material-icons md-dark">beach_access</span>
            </vs-button>
        </div>
    </div>
</template>

<script lang="ts">
import { tripType } from '@/utils/types/trip-type';
import { Component, Prop, Vue } from 'vue-property-decorator';
import olMap from './ol-map.vue';
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
.preview {
    height: 100vh;
    width: 100%;
    font-family: 'Poppins' !important;
}
.closest-trip {
    pointer-events: none;
    border-radius: 50px !important;
    height: 25px !important;
}
.destination {
    font-size: 10vh;
    overflow: hidden;
}
.dates {
    font-size: 3vh;
    border-radius: 50px;
}
.plan {
    margin-right: -2vw;
}
.trip-info {
    height: 30vh;
    overflow: hidden;
}
.map {
    /* width: 80%; */
    height: 40vh;
    border-radius: 50px;
}
</style>
