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
                    <v-icon size="15" color="white" class="pa-1">
                        fas fa-plus
                    </v-icon>
                </vs-button>
            </v-row>
        </v-row>

        <trip-plan
            :attractions="trip.attractions"
            :tripDates="getDatesRange(trip.startDate, trip.endDate)"
        />
        <AddAttractionModal
            :active.sync="showAddModal"
            @add-attraction="addAttractionToTrip"
        />
    </div>
</template>

<script lang="ts">
import AddAttractionModal from '@/components/AddAttractionModal.vue';
import TripPlan from '@/components/TripPlan.vue';
import { tripAttractionType } from '@/utils/types/trip-attraction-type';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { tripType } from '@/utils/types/trip-type';

@Component({
    components: {
        TripPlan,
        AddAttractionModal,
    },
})
export default class Plan extends Vue {
    @Prop() private id!: string;
    @Prop() private trip!: tripType;

    data(): { showAddModal: boolean } {
        return {
            showAddModal: false,
        };
    }

    openAddModal(): void {
        this.$data.showAddModal = true;
    }

    getDatesRange(startDate: Date, endDate: Date): Date[] {
        const dateRangeList: Date[] = [];
        const currentDate: Date = new Date(startDate);

        while (currentDate < endDate) {
            dateRangeList.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateRangeList;
    }

    async addAttractionToTrip(
        newAttraction: tripAttractionType,
    ): Promise<void> {
        const tripAttraction: tripAttractionType = {
            ...newAttraction,
            _id: this.id,
        };

        this.trip.attractions.push(tripAttraction);
        await fetch(process.env.VUE_APP_ADD_ATTRACTION, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tripAttraction),
        });
    }
}
</script>
