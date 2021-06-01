<template>
    <trip-plan />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TripPlan from '@/components/TripPlan.vue'; // @ is an alias to /src

@Component({
    components: {
        TripPlan,
    },
})
export default class Home extends Vue {
    @Prop() private trips!: any;
    created() {
        this.getTrips();
        // .then((response) => response.json())
        // .then((data) => (this.totalVuePackages = data.total));
    }
    async getTrips() {
        const data = await fetch('http://localhost:3000/api/trips/');
        this.trips = (await data.json()).trips;
    }

    //TODO: get trip values from site inputs
    async addTrip() {
        await fetch('http://localhost:3000/api/trips/add', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                trip: {
                    destination: 'Amsterdam',
                    startDate: new Date(),
                    endDate: new Date(),
                },
            }),
        });
    }
}
</script>
