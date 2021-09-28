<template>
    <div id="attractions">
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
import DateService, { DateObject } from '@/services/dateService';
import _ from 'lodash';

@Component({
    components: {
        AttractionItem,
    },
})
export default class Attractions extends Vue {
    @Prop() private attractions!: tripAttractionType[];
    @Prop() private currentDay!: Date;

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
}
</script>

<style scoped>
#attractions {
    height: fit-content;
}
</style>
