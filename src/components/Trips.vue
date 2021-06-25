<template>
    <div class="ma-0 pa-0" ref="target" id="target">
        <placeHolder :loading="loading"></placeHolder>
        <draggable group="places" v-bind="dragOptions" v-if="trips && !loading">
            <Place
                v-for="(place, index) in getTripInfo()"
                @select-trip="selectTrip(place.id)"
                :img="place.img"
                :name="place.name"
                :key="index"
            />
        </draggable>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { tripType } from '@/utils/types/trip-type';
import Place from './Place.vue';
import { convertTripTypeDatesToDateFormat } from '@/utils/converters/trip-type-converter';
import placeHolder from './PlaceLoader.vue';

@Component({
    components: {
        placeHolder,
        Place,
        draggable,
    },
})
export default class Trips extends Vue {
    private convertedTrips: tripType[] = [];

    get trips(): tripType[] {
        return this.convertedTrips;
    }

    set trips(value: tripType[]) {
        this.convertedTrips = convertTripTypeDatesToDateFormat(value);
    }

    created(): void {
        this.getTrips();
    }

    data(): { dragOptions: unknown; loading: boolean; page: number } {
        return {
            dragOptions: {
                animation: 200,
                delay: 200,
                delayOnTouchOnly: true,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost',
            },
            loading: true,
            page: 1,
        };
    }

    async getTrips(): Promise<void> {
        this.$data.loading = true;
        const data = await fetch(process.env.VUE_APP_GET_ALL_TRIPS);
        this.trips = (await data.json()).trips as tripType[];
        this.$data.loading = false;
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
