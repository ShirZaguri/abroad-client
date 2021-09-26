<template>
    <div>
        <v-row class="flex-column pl-10 pt-16 pb-3">
            <h1 id="explore-title">Explore</h1>
            <h4 id="explore-subtitle" class="font-weight-light">your trips</h4>
        </v-row>
        <swiper
            ref="swiperComponentRef"
            :options="swiperOption"
            class="swiper"
            @clickSlide="handleClickSlide"
        >
            <swiper-slide v-for="trip in trips" :key="trip._id">
                <trip-card :trip="trip" />
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
import TripCard from '../components/TripCard.vue';

// import 'swiper/css/swiper.css';
// import 'swiper/components/effect-coverflow/effect-coverflow.scss';
// import 'swiper/src/components/effect-coverflow/effect-coverflow';

@Component({
    components: {
        TripCard,
        Swiper,
        SwiperSlide,
    },
})
export default class Trips extends Vue {
    private convertedTrips: tripType[] = [];

    get swiperComponentinstance(): SwiperClass {
        return (this.$refs.swiperComponentRef as HTMLFormElement)
            ?.$swiper as SwiperClass;
    }

    get trips(): tripType[] {
        return this.convertedTrips;
    }

    set trips(value: tripType[]) {
        this.convertedTrips = convertTripTypeDatesToDateFormat(value);
    }

    created(): void {
        this.getTrips();
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

    async getTrips(): Promise<void> {
        const data = await fetch(process.env.VUE_APP_GET_TRIPS);
        this.trips = (await data.json()).trips as tripType[];
        // setInterval(() => (this.$data.loading = false), 5000);
    }

    handleClickSlide(): void {
        debugger;
        this.selectTrip(
            this.trips[this.swiperComponentinstance.clickedIndex]._id as any,
        );
    }

    getTripInfo(): { name: string; img: string; id?: string; link: string }[] {
        return this.trips.map((trip) => {
            return {
                name: trip.destination,
                img: trip.img,
                id: trip._id,
                link: '/trips/' + trip._id,
            };
        });
    }

    getTripById(id: string): tripType | undefined {
        return this.trips.find((trip) => trip._id === id);
    }

    selectTrip(id: string): void {
        this.$router.push({
            name: 'Plan',
            params: { id: id, trip: this.getTripById(id) as any },
        });
    }

    findClosestTrip(): tripType {
        const today = new Date();
        return this.convertedTrips?.reduce((a, b) =>
            a.startDate.getDate() - today.getDate() <
            b.startDate.getDate() - today.getDate()
                ? a
                : b,
        );
    }
}
</script>
<style lang="scss" scoped>
.swiper {
    height: 100%;
    width: 100%;

    .swiper-slide {
        display: flex;
        width: 75vw;
        height: 70vh;
        background-color: rgba(255, 255, 255, 0);
        background-position: center;
        background-size: cover;
    }
}
#explore-title {
    font-size: 10vw;
    line-height: 1.2;
}

#explore-subtitle {
    font-size: 5vw;
}
</style>
