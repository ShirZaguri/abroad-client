<template>
    <vs-dialog
        flat
        full-screen
        not-close
        blur
        :value="true"
        class="bottom-dialog"
        :autoWidth="true"
    >
        <StepSwiper :items="tabs">
            <template v-slot:info>shir</template>
            <template v-slot:date>za</template>
        </StepSwiper>
    </vs-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { attractionType } from '../utils/types/attraction-type';
import StepSwiper from '../components/StepSwiper.vue';

@Component({
    components: {
        StepSwiper,
    },
})
export default class AddAttraction extends Vue {
    @Prop() attraction?: attractionType;

    data(): { active: boolean; tabs: string[] } {
        return {
            active: false,
            tabs: ['info', 'date'],
        };
    }
}
</script>
