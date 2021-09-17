<template>
    <DividedScreen>
        <template v-slot:left>
            <TripPreview :currentTrip="findClosestTrip()"></TripPreview>
        </template>
        <template v-slot:right>
            <div class="ma-0 pa-0">
                <Place
                    v-for="(place, index) in getTripInfo()"
                    @select-trip="selectTrip(place.id)"
                    :img="place.img"
                    :name="place.name"
                    :key="index"
                />
            </div>
        </template>
    </DividedScreen>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { tripType } from '@/utils/types/trip-type';
import Place from '../components/Place.vue';
import DividedScreen from '@/components/DividedScreen.vue';
import { convertTripTypeDatesToDateFormat } from '@/utils/converters/trip-type-converter';
import PlaceLoader from '../components/PlaceLoader.vue';
import TripPreview from '../components/TripPreview.vue';

@Component({
    components: {
        PlaceLoader,
        Place,
        draggable,
        TripPreview,
        DividedScreen,
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
        const data = await fetch(process.env.VUE_APP_GET_TRIPS);
        this.trips = (await data.json()).trips as tripType[];
        this.$data.loading = false;
        // setInterval(() => (this.$data.loading = false), 5000);
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

    findClosestTrip(): tripType {
        const today = new Date();
        return this.convertedTrips?.reduce((a, b) =>
            a.startDate.getDate() - today.getDate() <
            b.startDate.getDate() - today.getDate()
                ? a
                : b,
        );
    }
}
</script>
<style scoped></style>
