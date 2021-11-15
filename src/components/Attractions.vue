<template>
    <div id="attractions">
        <v-btn dark @click="dialog = !dialog">create chat</v-btn>
        <EditAttraction
            v-if="dialog"
            :attraction="selectedAttraction"
        ></EditAttraction>
        <AttractionItem
            v-for="(attraction, index) in sortedAttractions"
            :key="index"
            :attraction="attraction"
            :now="attraction._id === closestAttractionId"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { tripAttractionType } from '@/utils/types/trip-attraction-type';
import AttractionItem from '@/components/AttractionItem.vue';
import EditAttraction from '@/components/EditAttraction.vue';
import DateService, { DateObject } from '@/services/dateService';
import _ from 'lodash';
import { attractionType } from '@/utils/types/attraction-type';

@Component({
    components: {
        AttractionItem,
        EditAttraction,
    },
})
export default class Attractions extends Vue {
    @Prop() private attractions!: tripAttractionType[];
    @Prop() private currentDay!: Date;

    data(): {
        dialog: boolean;
        selectedAttraction: attractionType | undefined;
    } {
        return { dialog: false, selectedAttraction: undefined };
    }

    get closestAttractionId(): string {
        return DateService.closestHourBackwards(
            this.sortedAttractions.map(
                (attraction) =>
                    ({
                        endDate: attraction.details.date,
                        _id: attraction._id,
                    } as DateObject),
            ),
        );
    }

    get fixedAttractions(): tripAttractionType[] {
        return this.attractions.map((atr) => {
            atr.details.done = false;
            return atr;
        });
    }

    get currentDayAttractions(): tripAttractionType[] {
        return this.fixedAttractions.filter((attraction) =>
            DateService.datesAreOnSameDay(
                attraction.details.date,
                this.currentDay,
            ),
        );
    }

    get sortedAttractions(): tripAttractionType[] {
        debugger;
        return _.orderBy(this.currentDayAttractions, 'details.date');
    }

    addAttraction(): void {
        console.log();
    }
}
</script>

<style scoped>
#attractions {
    height: fit-content;
}
</style>
