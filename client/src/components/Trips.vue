<template>
    <v-app>
        <!-- <div v-for="trip in trips" :key="trip"> -->
        <div class="ma-0 pa-0">
            <draggable group="places" v-bind="dragOptions">
                <Place
                    v-for="(place, index) in getTripPlace()"
                    @click="selectTrip(place.link)"
                    :place="place"
                    :key="index"
                />
            </draggable>
        </div>
        <!-- </div> -->
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
        // .then((response) => response.json())
        // .then((data) => (this.totalVuePackages = data.total));
    }
    data() {
        return {
            trips: undefined,
            dragOptions: {
                animation: 200,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost',
            },
        };
    }

    async getTrips() {
        const data = await fetch('http://localhost:3000/api/trips/');
        this.trips = (await data.json()).trips;
    }
    getTripPlace() {
        return this.trips.map((trip) => {
            return {
                name: trip.destination,
                type: trip.src,
                id: trip._id,
                link: '/trips/' + trip._id,
            };
        });
    }
    selectTrip(id) {
        this.$router.push({ name: 'Plan', params: { id: id } });
    }
}
</script>
