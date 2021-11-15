<template>
    <div v-if="items && items.length > 0" style="height: 100%">
        <v-tabs v-model="tab" style="height: 0px; display: none">
            <v-tabs-slider color="transparent"></v-tabs-slider>
            <v-tab v-for="item in items" :key="item"></v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="step-content pa-4">
            <v-tab-item v-for="item in items" :key="item">
                <slot :name="item"></slot>
            </v-tab-item>
        </v-tabs-items>

        <div class="center con-pagination">
            <vs-pagination
                not-arrows
                buttons-dotted
                :infinite="false"
                v-model="page"
                :length="steps"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class StepSwiper extends Vue {
    @Prop({ default: [] }) items?: string[];

    data(): { tab: number; page: number; steps: number } {
        return {
            tab: 0,
            page: 1,
            steps: this.items?.length || 0,
        };
    }

    @Watch('tab')
    onTabChanged(value: number): void {
        this.$data.page = value + 1;
    }

    @Watch('page')
    onPageChanged(value: number): void {
        this.$data.tab = value - 1;
    }
}
</script>
<style scoped>
.step-content {
    background-color: transparent !important;
    height: 100%;
}
</style>
