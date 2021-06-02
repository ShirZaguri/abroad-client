<template>
    <div>
        <v-btn @click="openAddModal">Add</v-btn>
        <trip-plan />
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

    data() {
        return {
            showAddModal: false,
        };
    }

    openAddModal() {
        this.$data.showAddModal = true;
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
