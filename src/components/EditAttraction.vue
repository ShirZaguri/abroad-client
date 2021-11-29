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
                <AttractionDetails></AttractionDetails>
            </template>
            <template v-slot:date>za</template>
        </StepSwiper>
    </vs-dialog>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue } from 'vue-property-decorator';
import { tripAttractionType } from '@/utils/types/trip-attraction-type';
import AttractionService from '@/services/attractionService';
import StepSwiper from '../components/StepSwiper.vue';
import AttractionDetails from '../components/AttractionDetails.vue';

@Component({
    components: {
        StepSwiper,
        AttractionDetails,
    },
})
export default class AddAttraction extends Vue {
    @InjectReactive('tripAttraction')
    private tripAttraction!: tripAttractionType;

    data(): { active: boolean; tabs: string[] } {
        return {
            active: false,
            tabs: ['info', 'date'],
        };
    }

    closeDialog(): void {
        AttractionService.updateAttraction(this.tripAttraction);
        this.$emit('close-dialog');
    }
}
</script>
