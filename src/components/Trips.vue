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
                    v-for="(place, index) in getTripPlace()"
                    @select-trip="selectTrip(place.id)"
                    :img="place.img"
                    :name="place.name"
                    :key="index"
                />
            </draggable>
        </div>
    </v-app>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Place from './Place.vue';
import draggable from 'vuedraggable';

@Component({
    components: {
        Place,
        draggable,
    },
})
export default class Trips extends Vue {
    created() {
        this.getTrips();
    }
    data() {
        return {
            trips: null,
            dragOptions: {
                animation: 200,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost',
            },
            loading: false,
        };
    }

    async getTrips() {
        this.loading = true;
        const data = await fetch(
            'https://abroad-server.herokuapp.com/api/trips/'
        );
        this.trips = (await data.json()).trips;
        this.loading = false;
    }

    getTripPlace() {
        return this.trips.map((trip) => {
            return {
                name: trip.destination,
                img: trip.img,
                type: trip.src,
                id: trip._id,
                link: '/trips/' + trip._id,
            };
        });
    }

    getTripById(id) {
        return this.trips.find((trip) => trip._id === id);
    }

    selectTrip(id) {
        this.$router.push({
            name: 'Plan',
            params: { id: id, trip: this.getTripById(id) },
        });
    }
}
</script>
