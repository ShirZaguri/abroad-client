<template>
    <div>
        <div v-for="day in daysNames" :key="day">
            <p class="font-weight-bold text-h6 ml-4 mb-0">
                {{ day }}
                <v-chip color="#ee3155" class="white--text" v-if="isToday(day)">
                    Today!
                </v-chip>
            </p>
            <div class="ma-0 pa-0" v-if="getDayAttractions(day).length > 0">
                <draggable
                    group="places"
                    v-bind="dragOptions"
                    @change="moveAttraction"
                >
                    <Place
                        v-for="(tripAttraction, index) in getDayAttractions(
                            day,
                        )"
                        :name="tripAttraction.attraction.name"
                        :img="tripAttraction.attraction.img"
                        :key="index"
                        :days="daysNames"
                        @moveTo="moveAttraction(tripAttraction, $event)"
                    />
                </draggable>
            </div>
            <p v-else class="ml-4">No plans for this day</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Place from './Place.vue';
import draggable from 'vuedraggable';
import { tripAttractionType } from '@/utils/types/trip-attraction-type';

@Component({
    components: {
        Place,
        draggable,
    },
})
export default class TripPlan extends Vue {
    @Prop() private attractions!: Array<tripAttractionType>;
    @Prop() private tripDates!: Array<Date>;

    data(): { dragOptions: any } {
        return {
            dragOptions: {
                animation: 200,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost',
            },
        };
    }

    get daysNames(): string[] {
        return this.tripDates.map((date) => this.getDateDayName(date));
    }

    getDateDayName(date: Date): string {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
        });
    }

    get attractionsByDate(): {
        day: string;
        attractions: tripAttractionType[];
    }[] {
        if (this.daysNames && this.attractions) {
            return this.daysNames.map((day) => ({
                day: day,
                attractions: this.attractions.filter((attraction) => {
                    return this.getDateDayName(attraction.details.date) === day;
                }),
            }));
        } else {
            return [];
        }
    }

    getDayAttractions(day: string): tripAttractionType[] | undefined {
        return this.attractionsByDate.find((searchDay) => searchDay.day === day)
            ?.attractions;
    }

    isToday(dayName: string): boolean {
        return (
            new Date().toLocaleString('en-us', { weekday: 'long' }) === dayName
        );
    }

    // TODO: make attractions move between days after drag
    moveAttraction(attraction, day) {
        // this.attractions.find(
        //     (attraction) => attraction.name === place.name
        // ).details.date = day;
        console.log(attraction);
        // this.attractions.find((attraction) => attraction.name === place.name);
        // newDay.places.push(place);
    }
}
</script>
