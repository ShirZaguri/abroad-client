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
            <template v-slot:time>
                <AttractionTime
                    :currentDate.sync="tripAttraction.details.date"
                />
            </template>
        </StepSwiper>
    </vs-dialog>
</template>

<script lang="ts">
import { Component, Inject, InjectReactive, Vue } from 'vue-property-decorator';
import { tripAttractionType } from '@/utils/types/trip-attraction-type';
import AttractionService from '@/services/attractionService';
import StepSwiper from '../components/StepSwiper.vue';
import AttractionDetails from '../components/AttractionDetails.vue';
import AttractionTime from './TimePicker.vue';
import DatePicker from './DatePicker.vue';

@Component({
    components: {
        StepSwiper,
        AttractionDetails,
        AttractionTime,
        DatePicker,
    },
})
export default class EditAttraction extends Vue {
    @InjectReactive('tripAttraction')
    private tripAttraction!: tripAttractionType;

    @Inject('tripId')
    private tripId!: string;

    data(): { tabs: string[] } {
        return {
            tabs: ['info', 'date', 'time'],
        };
    }

    closeDialog(): void {
        AttractionService.updateAttraction(this.tripId, {
            ...this.tripAttraction,
        });
        this.$emit('close-dialog');
    }
}
</script>
