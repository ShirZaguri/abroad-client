<template>
    <div>
        <v-btn @click="addAttractionToTrip">add attraction</v-btn>
        <trip-plan />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TripPlan from '@/components/TripPlan.vue';

@Component({
    components: {
        TripPlan,
    },
})
export default class Plan extends Vue {
    @Prop() private id!: any;

    async addAttractionToTrip(): Promise<void> {
        await fetch('http://localhost:3000/api/trips/addAttraction', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: this.id,
                attraction: {
                    name: 'New Event #2',
                    img: 'amsterdam-flag',
                    date: new Date(),
                },
            }),
        });
    }
}
</script>
