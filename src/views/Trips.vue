<template>
    <div>
        <v-row class="flex-column pl-10 pt-16 pb-3">
            <h1 id="explore-title">Explore</h1>
            <p id="explore-subtitle" light>your trips</p>
        </v-row>
        <swiper
            ref="swiperComponentRef"
            :options="swiperOption"
            class="swiper"
            @clickSlide="handleClickSlide"
        >
            <swiper-slide v-for="trip in trips" :key="trip._id">
                <trip-card :trip="trip" :closest="closestTripId === trip._id" />
            </swiper-slide>
        </swiper>
    </div>
</template>

<script lang="ts">
import { convertTripTypeDatesToDateFormat } from '@/utils/converters/trip-type-converter';
import { tripType } from '@/utils/types/trip-type';
import SwiperClass, { SwiperOptions } from 'swiper';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { Component, Vue } from 'vue-property-decorator';
import TripCard from '@/components/TripCard.vue';
import TripService from '@/services/tripService';
import _ from 'lodash';

import { namespace } from 'vuex-class';
import DateService, { DateObject } from '@/services/dateService';
const loading = namespace('loading');

@Component({
    components: {
        TripCard,
        Swiper,
        SwiperSlide,
    },
})
export default class Trips extends Vue {
    private convertedTrips: tripType[] = [];

    @loading.Action
    public toggleLoading!: () => void;

    get swiperComponentinstance(): SwiperClass {
        return (this.$refs.swiperComponentRef as HTMLFormElement)
            ?.$swiper as SwiperClass;
    }

    get trips(): tripType[] {
        return _.orderBy(this.convertedTrips, 'startDate');
    }

    set trips(value: tripType[]) {
        this.convertedTrips = convertTripTypeDatesToDateFormat(value);
    }

    get closestTripId(): string | undefined | number {
        return this.closestTrip(false);
    }

    async created(): Promise<void> {
        this.toggleLoading();
        this.trips = await TripService.getTrips();

        // const closestTripId = this.closestTripId;
        // const closestTrip = this.getTripById(closestTripId as string);
        // if (closestTrip) {
        //     if (
        //         DateService.dateInRange(
        //             new Date(),
        //             DateService.datesBetween(
        //                 closestTrip.startDate,
        //                 closestTrip.endDate,
        //             ),
        //         )
        //     ) {
        //         this.selectTrip(closestTripId as string);
        //     } else {
        this.$nextTick(() => {
            this.slideToTrip(this.closestTrip(true) as number);
        });
        // }
        // }

        this.toggleLoading();
    }

    data(): {
        swiperOption: SwiperOptions;
    } {
        return {
            swiperOption: {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                },
                freeMode: true,
            },
        };
    }

    private closestTrip(returnIndex: boolean): string | undefined | number {
        return DateService.closestForward(
            this.trips.map(
                (trip, i) =>
                    ({
                        startDate: trip.startDate,
                        endDate: trip.endDate,
                        _id: trip._id,
                        index: i,
                    } as DateObject),
            ),
            returnIndex,
        );
    }

    handleClickSlide(): void {
        this.selectTrip(
            this.trips[this.swiperComponentinstance.clickedIndex]._id as string,
        );
    }

    getTripById(id: string): tripType | undefined {
        return this.trips.find((trip) => trip._id === id);
    }

    selectTrip(id: string): void {
        this.$router.push({
            name: 'Overview',
            params: { id: id, trip: this.getTripById(id) as any },
        });
    }

    slideToTrip(index: number): void {
        (this.$refs.swiperComponentRef as HTMLFormElement)?.$swiper.slideTo(
            index,
        );
    }
}
</script>
<style scoped>
.swiper {
    height: 100%;
    width: 100%;
}

.swiper-slide {
    display: flex;
    width: 75vw;
    height: 70vh;
    background-color: rgba(255, 255, 255, 0);
    background-position: center;
    background-size: cover;
}

#explore-title {
    font-size: 10vw;
    line-height: 1.2;
}

#explore-subtitle {
    font-size: 5vw;
}
</style>
