<template>
    <div class="preview">
        <vs-button gradient class="closest-trip ml-6 mt-6 mb-0">
            Closest
        </vs-button>
        <v-row
            class="destination ml-6 mt-0 mr-6 pa-0 font-weight-black"
            justify="space-between"
        >
            {{ currentTrip.destination.toUpperCase() }}
        </v-row>
        <v-row class="dates ml-6 mt-4 mr-6 pa-0" justify="space-between">
            {{ currentTrip.startDate.toLocaleDateString() }} -
            {{ currentTrip.endDate.toLocaleDateString() }}
        </v-row>
    </div>
</template>

<script lang="ts">
import { tripType } from '@/utils/types/trip-type';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class TripPreview extends Vue {
    @Prop() private currentTrip!: tripType;

    created() {
        debugger;
        this.currentTrip.startDate;
    }
}
</script>
<style scoped>
.preview {
    height: 100%;
    width: 100%;
    font-family: 'Poppins' !important;
}
.closest-trip {
    pointer-events: none;
    border-radius: 50px !important;
    height: 25px !important;
}
.destination {
    font-size: 100vw;
}
</style>
