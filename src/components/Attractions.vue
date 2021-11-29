<template>
    <div id="attractions">
        <EditAttraction
            v-if="dialog"
            @close-dialog="dialog = false"
        ></EditAttraction>
        <AttractionItem
            v-for="(attraction, index) in sortedAttractions"
            :key="index"
            :tripAttraction="attraction"
            :now="attraction._id === closestAttractionId"
            @click.native="
                selectedAttraction = attraction;
                dialog = true;
            "
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, ProvideReactive } from 'vue-property-decorator';
import { tripAttractionType } from '@/utils/types/trip-attraction-type';
import AttractionItem from '@/components/AttractionItem.vue';
import EditAttraction from '@/components/EditAttraction.vue';
import DateService, { DateObject } from '@/services/dateService';
import _ from 'lodash';

@Component({
    components: {
        AttractionItem,
        EditAttraction,
    },
})
export default class Attractions extends Vue {
    @Prop() private attractions!: tripAttractionType[];
    @Prop() private currentDay!: Date;
    @ProvideReactive('tripAttraction')
    private selectedAttraction!: tripAttractionType;

    data(): {
        dialog: boolean;
    } {
        return {
            dialog: false,
        };
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
        return _.orderBy(this.currentDayAttractions, 'details.date');
    }

    addAttraction(): void {
        console.log();
    }

    attractionClicked(): void {
        this.$data.dialog = true;
    }
}
</script>

<style scoped>
#attractions {
    height: fit-content;
}
</style>
