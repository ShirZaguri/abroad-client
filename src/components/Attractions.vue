<template>
    <div>
        <AttractionItem
            v-for="(attraction, index) in sortedAttractions"
            :key="index"
            :attraction="attraction"
            :now="attraction._id === closestAttractionId"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { tripAttractionType } from '@/utils/types/trip-attraction-type';
import AttractionItem from '@/components/AttractionItem.vue';
import DateService from '@/services/dateService';

@Component({
    components: {
        AttractionItem,
    },
})
export default class Attractions extends Vue {
    @Prop() private attractions!: tripAttractionType[];
    @Prop() private currentDay!: Date;

    get closestAttractionId(): string {
        const today = Number(new Date());
        const previousAttractions: tripAttractionType[] =
            this.sortedAttractions.filter(
                (attraction) => Number(attraction.details.date) < today,
            );
        console.log(previousAttractions);
        return previousAttractions[previousAttractions.length - 1]._id;
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
        return this.currentDayAttractions.sort(
            (a: tripAttractionType, b: tripAttractionType) => {
                return Number(a.details.date) - Number(b.details.date);
            },
        );
    }
}
</script>

<style>
</style>
