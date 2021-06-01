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
}
</script>
