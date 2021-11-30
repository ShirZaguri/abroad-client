<template>
    <div>
        <v-date-picker
            v-model="selected"
            no-title
            :range="range"
            :reactive="true"
            :allowed-dates="allowedDates"
            color="#6f42ff"
            class="date-picker"
            @change="dateChanged"
        >
            <template #default></template>
        </v-date-picker>
    </div>
</template>

<script lang="ts">
import DateService from '@/services/dateService';
import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DatePicker extends Vue {
    // @Prop({ default: () => true }) allowedDates?: (val) => boolean;
    @Prop({ default: false }) range?: boolean;
    @Prop() value?: Date[] | Date;
    @Inject('tripDates') private tripDates!: Date[];

    get allowedDates() {
        return (date: string): boolean =>
            DateService.dateInRange(date, this.tripDates);
    }

    data(): { selected: string[] | string | undefined } {
        return { selected: '' };
    }

    created(): void {
        const dateFormater = (date: Date) => date.toLocaleDateString('fr-CA');

        this.$data.selected = this.range
            ? (this.value as unknown as Date[])?.map((date: Date) =>
                  dateFormater(date),
              )
            : dateFormater(this.value as unknown as Date);
    }

    dateChanged(): void {
        const updatedDate = this.range
            ? (this.value as unknown as Date[])?.map((date, index) => {
                  return this.changeOnlyDate(
                      date,
                      new Date(
                          (this.$data.selected as unknown as Date[])[index],
                      ),
                  );
              })
            : this.changeOnlyDate(
                  this.value as unknown as Date,
                  new Date(this.$data.selected as unknown as Date),
              );

        this.$emit('update:value', updatedDate);
    }

    private changeOnlyDate(cuurentDateWithTime: Date, newDate: Date): Date {
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
