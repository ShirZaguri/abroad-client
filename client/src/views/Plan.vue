<template>
    <div>
        <v-row
            class="mt-4 ml-1 mr-3 mb-3"
            justify="space-between"
            align="center"
        >
            <p class="font-weight-bold text-h4 pa-0 ma-0 ml-4">
                {{ trip.destination }}
            </p>
            <v-row class="ma-0 pa-0" justify="end">
                <vs-button circle icon floating @click="openAddModal">
                    <v-icon size="15" color="white" class="pa-1"
                        >fas fa-plus</v-icon
                    >
                </vs-button>
            </v-row>
        </v-row>

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
        const attraction = {
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
        };
        this.trip.attractions.push(attraction);
        await fetch('http://localhost:3000/api/trips/addAttraction', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attraction),
        });
    }
}
</script>
