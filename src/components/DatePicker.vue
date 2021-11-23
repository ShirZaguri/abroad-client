<template>
    <v-date-picker
        v-model="dates"
        :range="range"
        no-title
        color="#6f42ff"
        class="date-picker"
    >
        <!-- :allowed-dates="allowedDates" -->
        <template #default></template>
    </v-date-picker>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class DatePicker extends Vue {
    // @Prop({ default: () => true }) allowedDates?: (val) => boolean;
    @Prop({ default: false }) range?: boolean;

    data(): { dates: string[] } {
        return {
            dates: ['2019-09-10', '2019-09-20'],
        };
    }

    @Watch('date')
    onDateChange(): void {
        this.$emit('date-selected', this.$data.dates);
    }
}
</script>

<style scoped>
.date-picker {
    background-color: transparent !important;
}
</style>
