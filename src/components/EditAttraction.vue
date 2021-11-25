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
                <AttractionDetails
                    :attraction="item.attraction"
                ></AttractionDetails>
            </template>
            <template v-slot:date>za</template>
        </StepSwiper>
    </vs-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { attractionType } from '../utils/types/attraction-type';
import StepSwiper from '../components/StepSwiper.vue';
import AttractionDetails from '../components/AttractionDetails.vue';

@Component({
    components: {
        StepSwiper,
        AttractionDetails,
    },
})
export default class AddAttraction extends Vue {
    @Prop() item?: attractionType;

    data(): { active: boolean; tabs: string[] } {
        return {
            active: false,
            tabs: ['info', 'date'],
        };
    }

    closeDialog(): void {
        this.$emit('close-dialog');
    }
}
</script>
