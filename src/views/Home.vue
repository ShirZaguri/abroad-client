<template>
    <trips />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Trips from '@/components/Trips.vue'; // @ is an alias to /src

@Component({
    components: {
        Trips,
    },
})
export default class Home extends Vue {
    @Prop() private trips!: any;
    created(): void {
        this.getTrips();
        // .then((response) => response.json())
        // .then((data) => (this.totalVuePackages = data.total));
    }
    async getTrips() {
        const data = await fetch(
            'https://abroad-server.herokuapp.com/api/trips/'
        );
        this.trips = (await data.json()).trips;
    }

    //TODO: get trip values from site inputs
    async addTrip() {
        await fetch('https://abroad-server.herokuapp.com/api/trips/add', {
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
