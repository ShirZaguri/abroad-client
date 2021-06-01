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
        const data = await (
            await fetch('http://localhost:3000/api/trips/')
        ).json();
        this.trips = data;
        console.log(this.trips.trips);
    }
}
</script>
