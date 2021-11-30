<template>
    <div style="position: relative">
        <swiper
            ref="dateSwiper"
            :options="swiperOption"
            class="swiper-units front-units"
        >
            <swiper-slide v-for="(date, i) in dates" :key="i">
                <div
                    class="
                        date-holder
                        d-flex
                        flex-column
                        align-center
                        font-weight-bold
                        justify-center
                    "
                >
                    <div class="text-h5 font-weight-bold">
                        {{ date | day }}
                    </div>
                    <div class="small-line-height">{{ date | shortMonth }}</div>
                </div>
            </swiper-slide>
        </swiper>
        <div class="swiper-units d-flex justify-center">
            <div class="centered-active"></div>
        </div>
    </div>
</template>

<script lang="ts">
import DateService from '@/services/dateService';
import SwiperClass, { SwiperOptions } from 'swiper';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {
        Swiper,
        SwiperSlide,
    },
})
export default class DateSwiper extends Vue {
    @Prop() dates?: Date[];

    mounted(): void {
        this.$nextTick(() => {
            const emit = (index: number) => this.$emit('date-changed', index);
            const swiper = (this.$refs.dateSwiper as HTMLFormElement)?.$swiper;
            swiper.on('activeIndexChange', function (this: SwiperClass) {
                emit(this.activeIndex);
            });

            swiper.slideTo(this.currentDateIndex());
        });
    }

    data(): {
        activeIndex: number;
        swiperOption: SwiperOptions;
    } {
        return {
            activeIndex: 0,
            swiperOption: {
                grabCursor: true,
                spaceBetween: 30,
                centeredSlides: true,
                slidesPerView: 5,
                slideToClickedSlide: true,
            },
        };
    }

    currentDateIndex(): number {
        let todayIndex = 0;

        this.dates?.forEach((date, i) => {
            todayIndex = DateService.isToday(date) ? i : todayIndex;
        });

        return todayIndex;
    }
}
</script>
<style scoped>
.swiper-units {
    height: 7vh;
    color: rgb(62, 62, 62);
    width: 100%;
}

.front-units {
    position: absolute !important;
    left: 0px;
    top: 0px;
}

.small-line-height {
    line-height: 0.3;
}

.centered-active {
    background-color: white;
    border-radius: 20px;
    width: 14vw;
    height: 100%;
}

.swiper-slide {
    width: 25vw;
    height: 7vh;
    background-color: rgba(255, 255, 255, 0);
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
}

.date-holder {
    padding-bottom: 1vh;
}

.swiper-slide-active {
    color: #6f42ff !important;
}
</style>
