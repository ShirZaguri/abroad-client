<template>
    <swiper :ref="refName" :options="swiperOption">
        <swiper-slide v-for="(item, i) in items" :key="i">
            <span class="item">{{ item }}</span>
        </swiper-slide>
    </swiper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SwiperClass, { SwiperOptions } from 'swiper';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

@Component({
    components: {
        Swiper,
        SwiperSlide,
    },
})
export default class VerticalSwiper extends Vue {
    @Prop() private name?: string;
    @Prop({ default: [] }) private items?: any[];
    @Prop({ default: '08' }) private current?: string;

    get refName(): string {
        return this.name + '-swiper';
    }

    data(): {
        swiperOption: SwiperOptions;
    } {
        return {
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

    get currentIndex(): number {
        return this.items
            ? this.items.findIndex(
                  (item) =>
                      +item == +(this.current as string) ||
                      item == this.current,
              )
            : 0;
    }

    mounted(): void {
        this.$nextTick(() => {
            const updateCurrentValue = (currentIndex: number) => {
                if (this.items) {
                    this.$emit('update:current', this.items[currentIndex]);
                    this.$emit('current-changed', this.items[currentIndex]);
                }
            };
            (this.$refs[this.refName] as HTMLFormElement)?.$swiper.slideTo(
                this.currentIndex,
            );
            (this.$refs[this.refName] as HTMLFormElement)?.$swiper.on(
                'activeIndexChange',
                function (this: SwiperClass) {
                    updateCurrentValue(this.activeIndex);
                },
            );
        });
    }
}
</script>

<style scoped>
.item {
    font-size: 2.2em;
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
