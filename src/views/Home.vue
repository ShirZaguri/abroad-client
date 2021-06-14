<template>
    <trips />
</template>

<script lang="ts">
import Trips from '@/components/Trips.vue'; // @ is an alias to /src
import { tripType } from '@/models/trip-type';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {
        Trips,
    },
})
export default class Home extends Vue {
    @Prop() private trips!: [tripType];

    //TODO: get trip values from site inputs
    async addTrip(): Promise<void> {
        await fetch(process.env.VUE_APP_ADD_TRIP, {
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
