<template>
    <v-app>
        <div class="mt-4 mb-3">
            <p class="font-weight-bold text-h3 pa-0 ma-0 ml-4">Amsterdam</p>
        </div>
        <div v-for="day in daysNames" :key="day">
            <p class="font-weight-bold text-h6 ml-4 mb-0">
                {{ day }}
                <v-chip color="#ee3155" class="white--text" v-if="isToday(day)"
                    >Today!</v-chip
                >
            </p>
            <div class="ma-0 pa-0" v-if="getDayPlaces(day).length > 0">
                <draggable group="places" v-bind="dragOptions">
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
            trip: [
                {
                    date: 'Thursday',
                    places: [
                        {
                            name: 'Zaanse Schans',
                            price: 15,
                            type: 'zans',
                            link: 'https://goo.gl/maps/AyXVKM5k6qVmDN3d6',
                        },
                    ],
                },
                {
                    date: 'Friday',
                    places: [
                        {
                            name: 'Hitorn',
                            price: 18,
                            type: 'trip',
                        },
                        // {
                        //   name: "Adam's Lookout",
                        //   price: 18,
                        //   type: "adams",
                        //   link: "https://goo.gl/maps/gPYBkAmLfSbTy3tg7",
                        // },
                        // {
                        //   name: "Madame Tussauds",
                        //   price: 15,
                        //   type: "madam",
                        //   link: "https://goo.gl/maps/Xtj7LzSLPbqEQirA9",
                        // },
                    ],
                },
                {
                    date: 'Saturday',
                    places: [
                        {
                            name: 'Anna Frank',
                            price: 15,
                            type: 'mus',
                            link: 'https://goo.gl/maps/oxL2ahneEdrucKba6',
                        },
                        {
                            name: 'Ripleys',
                            price: 15,
                            type: 'funnymus',
                            link: 'https://goo.gl/maps/miJjNog1Vy2Fq5aZ7',
                        },

                        {
                            name: 'Heineken',
                            price: 15,
                            type: 'beer',
                            link:
                                'https://g.page/heineken-experience-amsterdam?share',
                        },
                        {
                            name: 'Holland Casino',
                            price: 15,
                            type: 'casino',
                            link: 'https://goo.gl/maps/Z7osdfM8M4tKjMEWA',
                        },
                    ],
                },
                {
                    date: 'Sunday',
                    places: [
                        {
                            name: 'Efteling',
                            price: 18,
                            type: 'lunapark',
                            link: 'https://goo.gl/maps/zZN36FmztzEMCefNA',
                        },

                        // {
                        //   name: "Dangeoun",
                        //   price: 15,
                        //   type: "dang",
                        //   link: "https://g.page/DungeonAMS?share",
                        // },
                    ],
                },
                {
                    date: 'Monday',
                    places: [
                        { name: 'Bike Riding', price: 15, type: 'bike' },

                        {
                            name: 'Vondelpark',
                            price: 15,
                            type: 'nature',
                            link: 'https://goo.gl/maps/HavjUwT7Pzv7rZZ76',
                        },

                        {
                            name: 'Wnder',
                            price: 15,
                            type: 'jimbory',
                            link: 'https://g.page/WONDR-Experience?share',
                        },
                        { name: 'Ice Bar', price: 15, type: 'icebar' },
                    ],
                },
            ],

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
        const [dd, mm, yyyy] = date.split('-'),
            convertedDate = new Date(yyyy, mm - 1, dd);
        return convertedDate.toLocaleDateString('en-US', { weekday: 'long' });
    }

    get attractionsByDate() {
        if (this.daysNames && this.attractions) {
            console.log('In');
            // return this.daysNames.map((day) => {
            //     const dayPlaces = [];
            //     dayPlaces.push(
            //         this.attractions.filter(
            //             (attraction) =>
            //                 this.getDateDayName(attraction.date) === day
            //         )
            //     );
            //     return dayPlaces;
            // });
            return this.daysNames.map((day) => ({
                date: day,
                places: this.attractions.filter((attraction) => {
                    console.log(this.getDateDayName(attraction.date));
                    return this.getDateDayName(attraction.date) === day;
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

    movePlace(place, newDate) {
        const oldDay = this.$data.trip.find((day) =>
            day.places.find(
                (searchedPlace) => searchedPlace.name === place.name
            )
        );
        const newDay = this.$data.trip.find((day) => day.date === newDate);
        oldDay.places = oldDay.places.filter(
            (searchedPlace) => searchedPlace.name !== place.name
        );
        newDay.places.push(place);
    }
}
</script>
