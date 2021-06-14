<template>
    <v-app>
        <v-overlay :opacity="0.9" :value="loading">
            <v-progress-circular indeterminate size="64">
                Loading...
            </v-progress-circular>
        </v-overlay>
        <div class="ma-0 pa-0">
            <draggable group="places" v-bind="dragOptions" v-if="trips">
                <Place
                    v-for="(place, index) in getTripInfo()"
                    @select-trip="selectTrip(place.id)"
                    :img="place.img"
                    :name="place.name"
                    :key="index"
                />
            </draggable>
        </div>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { tripType } from '../models/trip-type';
import Place from './Place.vue';
import { convertTripTypeDatesToDateFormat } from '../converters/trip-type-converter';

@Component({
    components: {
        Place,
        draggable,
    },
})
export default class Trips extends Vue {
    private convertedTrips: tripType[] = [];
    private loading = false;

    get trips(): tripType[] {
        return this.convertedTrips;
    }

    set trips(value: tripType[]) {
        this.convertedTrips = convertTripTypeDatesToDateFormat(value);
    }

    created(): void {
        this.getTrips();
    }

    data(): { dragOptions: unknown } {
        return {
            dragOptions: {
                animation: 200,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost',
            },
        };
    }

    async getTrips(): Promise<void> {
        this.loading = true;
        const data = await fetch(process.env.VUE_APP_GET_ALL_TRIPS);
        this.trips = (await data.json()).trips as tripType[];
        this.loading = false;
    }

    getTripInfo(): { name: string; img: string; id?: string; link: string }[] {
        return this.trips.map((trip) => {
            return {
                name: trip.destination,
                img: trip.img,
                id: trip._id,
                link: '/trips/' + trip._id,
            };
        });
    }

    getTripById(id: string): tripType | undefined {
        return this.trips.find((trip) => trip._id === id);
    }

    selectTrip(id: string): void {
        this.$router.push({
            name: 'Plan',
            params: { id: id, trip: this.getTripById(id) as any },
        });
    }
}
</script>
