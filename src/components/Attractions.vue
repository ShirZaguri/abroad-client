<template>
    <div>
        <EditAttraction
            v-if="dialog"
            :item="selectedAttraction"
            @close-dialog="dialog = false"
        ></EditAttraction>
        <v-virtual-scroll
            v-if="sortedAttractions.length > 0"
            :items="sortedAttractions"
            :item-height="80"
            height="400"
        >
            <template v-slot:default="{ item }">
                <v-row class="ma-0 pa-0" justify="center">
                    <v-col cols="10">
                        <AttractionItem
                            :key="index"
                            :attraction="item"
                            :now="item._id === closestAttractionId"
                            @click.native="
                                selectedAttraction = item;
                                dialog = true;
                            "
                        />
                    </v-col>
                </v-row>
            </template>
        </v-virtual-scroll>
        <v-row v-else class="pa-0 ma-0 mt-6" align="center" justify="center">
            <v-img
                contain
                src="../assets/images/sleep.png"
                max-height="150"
            ></v-img>
            <span class="font-weight-bold">No plans for today yet</span>
        </v-row>
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
</style>
