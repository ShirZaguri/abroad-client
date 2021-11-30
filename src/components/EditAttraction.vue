<template>
    <vs-dialog
        flat
        full-screen
        not-close
        blur
        overflow-hidden
        :value="true"
        class="bottom-dialog"
        :autoWidth="true"
        @close="closeDialog"
    >
        <StepSwiper :items="tabs">
            <template v-slot:info>
                <AttractionDetails />
            </template>
            <template v-slot:date>
                <DatePicker
                    :value.sync="tripAttraction.details.date"
                ></DatePicker>
            </template>
        </StepSwiper>
    </vs-dialog>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue } from 'vue-property-decorator';
import { tripAttractionType } from '@/utils/types/trip-attraction-type';
import AttractionService from '@/services/attractionService';
import StepSwiper from '../components/StepSwiper.vue';
import AttractionDetails from '../components/AttractionDetails.vue';
import DatePicker from './DatePicker.vue';

@Component({
    components: {
        StepSwiper,
        AttractionDetails,
        DatePicker,
    },
})
export default class AddAttraction extends Vue {
    @InjectReactive('tripAttraction')
    private tripAttraction!: tripAttractionType;

    data(): { tabs: string[] } {
        return {
            tabs: ['info', 'date', 'time'],
        };
    }

    closeDialog(): void {
        AttractionService.updateAttraction(this.tripAttraction);
        this.$emit('close-dialog');
    }
}
</script>
