<template>
    <div>
        <vs-button
            id="add-attraction-btn"
            gradient
            circle
            icon
            @click="
                selectedAttraction = {
                    details: { date: currentDay },
                    attraction: { name: '' },
                };
                dialog = true;
            "
        >
            <v-icon size="15" color="white" class="pa-1">fas fa-plus</v-icon>
        </vs-button>
        <EditAttraction
            v-if="dialog"
            @close-dialog="dialog = false"
        ></EditAttraction>
        <div
            v-if="sortedAttractions.length > 0"
            class="pb-4"
            id="attractions-holder"
        >
            <AttractionItem
                v-for="(attraction, i) in sortedAttractions"
                :key="i"
                :tripAttraction="attraction"
                :now="attraction._id === closestAttractionId"
                @click.native="
                    selectedAttraction = attraction;
                    dialog = true;
                "
            />
        </div>

        <v-row
            v-else
            id="no-plans-holder"
            class="pa-0 ma-0"
            align="center"
            justify="center"
        >
            <div class="d-flex flex-column align-center">
                <img id="no-plans-img" src="../assets/images/sleep.png" />
                <span class="font-weight-bold">No plans for today yet</span>
            </div>
        </v-row>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Prop,
    ProvideReactive,
    Inject,
} from 'vue-property-decorator';
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

    @Inject('tripDates') private tripDates?: Date[];

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
#attractions-holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    height: 60vh;
}

#no-plans-holder {
    height: 50vh;
}

#no-plans-img {
    height: 20vh;
}

#add-attraction-btn {
    position: absolute;
    height: 6.5vh;
    width: 6.5vh;
    bottom: 7vh;
    right: 5vh;
}

#plus {
    font-size: 3vh;
}
</style>
