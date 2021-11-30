<template>
    <div>
        <v-date-picker
            v-model="value"
            :range="range"
            no-title
            :reactive="true"
            color="#6f42ff"
            class="date-picker"
            @change="dateChanged"
        >
            <!-- :allowed-dates="allowedDates" -->
            <template #default></template>
        </v-date-picker>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class DatePicker extends Vue {
    // @Prop({ default: () => true }) allowedDates?: (val) => boolean;
    @Prop({ default: false }) range?: boolean;
    @Prop() dates?: Date[] | Date;
    private value: string[] | string | undefined = '';

    @Watch('date')
    onDateChange(): void {
        this.$emit('date-selected', this.$data.dates);
    }

    created(): void {
        this.range
            ? (this.value = (this.dates as unknown as Date[])?.map(
                  (date: Date) => date.toLocaleDateString('fr-CA'),
              ))
            : (this.value = (this.dates as unknown as Date)?.toLocaleDateString(
                  'fr-CA',
              ));
    }

    dateChanged(): void {
        const updatedDate = this.range
            ? (this.dates as unknown as Date[])?.map((date, index) => {
                  return this.changeOnlyDate(
                      date,
                      new Date((this.value as unknown as Date[])[index]),
                  );
              })
            : this.changeOnlyDate(
                  this.dates as unknown as Date,
                  new Date(this.value as unknown as Date),
              );

        this.$emit('update:dates', updatedDate);
    }

    changeOnlyDate(cuurentDateWithTime: Date, newDate: Date): Date {
        const updatedDate: Date = new Date(cuurentDateWithTime);

        updatedDate.setDate(newDate.getDate());
        updatedDate.setMonth(newDate.getMonth());
        updatedDate.setFullYear(newDate.getFullYear());

        return updatedDate;
    }
}
</script>

<style scoped>
.date-picker {
    background-color: transparent !important;
}
</style>
