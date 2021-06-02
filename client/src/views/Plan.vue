<template>
    <div>
        <v-btn @click="openAddModal">Add</v-btn>
        <trip-plan
            :attractions="trip.attractions"
            :tripDays="getDatesRange(trip.startDate, trip.endDate)"
        />
        <AddAttractionModal
            :active.sync="showAddModal"
            @add-attraction="addAttractionToTrip"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TripPlan from '@/components/TripPlan.vue';
import AddAttractionModal from '@/components/AddAttractionModal.vue';

@Component({
    components: {
        TripPlan,
        AddAttractionModal,
    },
})
export default class Plan extends Vue {
    @Prop() private id!: any;
    @Prop() private trip!: any;

    data() {
        return {
            showAddModal: false,
        };
    }

    openAddModal() {
        this.$data.showAddModal = true;
    }

    getDatesRange(startDate, endDate) {
        const listDate = [];
        const dateMove = new Date(startDate);
        let strDate = startDate;

        while (strDate < endDate) {
            strDate = dateMove.toISOString().slice(0, 10);
            listDate.push(strDate);
            dateMove.setDate(dateMove.getDate() + 1);
        }

        return listDate;
    }

    async addAttractionToTrip(newAttraction): Promise<void> {
        await fetch('http://localhost:3000/api/trips/addAttraction', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: this.id,
                attraction: {
                    name: newAttraction.name,
                    img: newAttraction.img,
                    description: 'bubi killed it',
                },
                details: {
                    date: newAttraction.date,
                    price: 15,
                },
            }),
        });
    }
}
</script>
