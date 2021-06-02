<template>
    <v-app>
        <div v-for="day in daysNames" :key="day">
            <p class="font-weight-bold text-h6 ml-4 mb-0">
                {{ day }}
                <v-chip color="#ee3155" class="white--text" v-if="isToday(day)"
                    >Today!</v-chip
                >
            </p>
            <div class="ma-0 pa-0" v-if="getDayPlaces(day).length > 0">
                <draggable
                    group="places"
                    v-bind="dragOptions"
                    @change="movePlace"
                >
                    <Place
                        v-for="(attraction, index) in getDayPlaces(day)"
                        :place="attraction.attraction"
                        :key="index"
                        :days="daysNames"
                        @moveTo="movePlace(attraction, $event)"
                    />
                </draggable>
            </div>
            <p v-else class="ml-4">No plans for this day</p>
        </div>
    </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Place from './Place.vue';
import draggable from 'vuedraggable';

@Component({
    components: {
        Place,
        draggable,
    },
})
export default class TripPlan extends Vue {
    @Prop() private attractions!: Array<any>;
    @Prop() private tripDays!: Array<any>;

    data() {
        return {
            dragOptions: {
                animation: 200,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost',
            },
        };
    }

    get daysNames() {
        return this.tripDays.map((day) => this.getDateDayName(day));
    }

    getDateDayName(date) {
        return new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    }

    get attractionsByDate() {
        if (this.daysNames && this.attractions) {
            return this.daysNames.map((day) => ({
                date: day,
                places: this.attractions.filter((attraction) => {
                    return this.getDateDayName(attraction.details.date) === day;
                }),
            }));
        } else {
            return [];
        }
    }

    getDayPlaces(day) {
        return this.attractionsByDate.find(
            (searchDay) => searchDay.date === day
        ).places;
    }

    isToday(dayName) {
        return (
            new Date().toLocaleString('en-us', { weekday: 'long' }) === dayName
        );
    }

    movePlace(place) {
        console.log(place);
        // this.attractions.find((attraction) => attraction.name === place.name);
        // newDay.places.push(place);
    }
}
</script>
