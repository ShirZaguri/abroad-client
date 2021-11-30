<template>
    <v-row justify="center" align="center" class="ma-0 pa-0">
        <div class="amit" />
        <v-col cols="5" class="swiperHolder pa-0 d-flex">
            <swiper ref="hourSwiper" :options="swiperOption">
                <swiper-slide v-for="(hour, i) in hours" :key="i">
                    <span class="hour">{{ hour }}</span>
                </swiper-slide>
            </swiper>
        </v-col>
        <v-col cols="5" class="swiperHolder pa-0 d-flex">
            <swiper ref="minuteSwiper" :options="swiperOption">
                <swiper-slide v-for="(minute, i) in minutes" :key="i">
                    <span class="hour">{{ minute }}</span>
                </swiper-slide>
            </swiper>
        </v-col>
        <!-- <div class="centered-active"></div> -->
    </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SwiperClass, { SwiperOptions } from 'swiper';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

@Component({
    components: {
        Swiper,
        SwiperSlide,
    },
})
export default class AttractionTime extends Vue {
    @Prop() currentDate?: Date;

    private hours = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '00',
    ];

    private minutes = [
        '00',
        '05',
        '10',
        '15',
        '20',
        '25',
        '30',
        '35',
        '40',
        '45',
        '50',
        '55',
    ];

    data(): {
        activeHour: string;
        activeMinute: string;
        swiperOption: SwiperOptions;
    } {
        return {
            activeHour: '08',
            activeMinute: '15',
            swiperOption: {
                direction: 'vertical',
                effect: 'coverflow',
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                },
                centeredSlides: true,
                slidesPerView: 6,
                slideToClickedSlide: true,
            },
        };
    }

    created(): void {
        this.$data.activeHour = this.$props.currentDate.getHours().toString();
        this.$data.activeMinute = this.$props.currentDate
            .getMinutes()
            .toString();
    }

    updateCurrentTime(): void {
        const newDate = new Date(this.$props.currentDate);
        newDate.setHours(Number(this.$data.activeHour));
        newDate.setMinutes(Number(this.$data.activeMinute));
        this.$emit('update:currentDate', newDate);
    }

    get currentHourIndex(): number {
        return this.hours.findIndex((hour) => +hour == +this.$data.activeHour);
    }

    get currentMinuteIndex(): number {
        return this.minutes.findIndex(
            (minute) => +minute == +this.$data.activeMinute,
        );
    }

    mounted(): void {
        this.$nextTick(() => {
            (this.$refs.hourSwiper as HTMLFormElement)?.$swiper.slideTo(
                this.currentHourIndex,
            );

            (this.$refs.minuteSwiper as HTMLFormElement)?.$swiper.slideTo(
                this.currentMinuteIndex,
            );

            const updateActiveHour = (hourIndex: number) => {
                this.$data.activeHour = this.$data.hours[hourIndex];
                this.updateCurrentTime();
            };

            (this.$refs.hourSwiper as HTMLFormElement)?.$swiper.on(
                'activeIndexChange',
                function (this: SwiperClass) {
                    updateActiveHour(this.activeIndex);
                },
            );

            const updateActiveMinute = (minuteIndex: number) => {
                this.$data.activeMinute = this.$data.minutes[minuteIndex];
                this.updateCurrentTime();
            };
            (this.$refs.minuteSwiper as HTMLFormElement)?.$swiper.on(
                'activeIndexChange',
                function (this: SwiperClass) {
                    updateActiveMinute(this.activeIndex);
                },
            );
        });
    }
}
</script>
<style scoped>
.hour {
    font-size: 2.2em;
}

.swiper-container {
    height: 40vh;
}

.amit {
    position: absolute;
    width: 100%;
    height: 6vh;
    background-color: rgb(44, 44, 44);
    border-radius: 5px;
    align-self: center;
    justify-self: center;
}

.swiper-slide {
    background-color: rgba(255, 255, 255, 0);
    background-position: center;
    background-size: cover;
    font-weight: 300;
    letter-spacing: 0.5em;
    color: rgb(122, 122, 122);
    display: flex;
    align-items: center;
    justify-items: center;
}

.swiper-slide-active {
    color: #6f42ff !important;
    font-weight: 700;
}
</style>
