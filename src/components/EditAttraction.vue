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
            <template v-slot:date>za</template>
            <template v-slot:time>
                <AttractionTime
                    :currentDate.sync="tripAttraction.details.date"
                />
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
import AttractionTime from './TimePicker.vue';

@Component({
    components: {
        StepSwiper,
        AttractionDetails,
        AttractionTime,
    },
})
export default class AddAttraction extends Vue {
    @InjectReactive('tripAttraction')
    private tripAttraction!: tripAttractionType;

    data(): { active: boolean; tabs: string[] } {
        return {
            active: false,
            tabs: ['info', 'date', 'time'],
        };
    }

    closeDialog(): void {
        AttractionService.updateAttraction(this.tripAttraction);
        this.$emit('close-dialog');
    }
}
</script>
