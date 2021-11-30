<template>
    <v-row justify="center" align="center" class="ma-0 pa-0">
        <div class="centered" />
        <v-col cols="5" class="swiperHolder pa-0 d-flex">
            <VerticalSwiper
                :name="'hour'"
                :items="hours"
                :current.sync="activeHour"
                @current-changed="updateCurrentTime"
            />
        </v-col>
        <v-col cols="5" class="swiperHolder pa-0 d-flex">
            <VerticalSwiper
                :name="'minute'"
                :items="minutes"
                :current.sync="activeMinute"
                @current-changed="updateCurrentTime"
            />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { SwiperOptions } from 'swiper';
import { Swiper } from 'vue-awesome-swiper';
import { Component, Prop, Vue } from 'vue-property-decorator';
import VerticalSwiper from '@/components/VerticalSwiper.vue';

@Component({
    components: {
        Swiper,
        VerticalSwiper,
    },
})
export default class AttractionTime extends Vue {
    @Prop() private currentDate?: Date;

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
        this.$data.activeHour = (this.currentDate as Date)
            .getHours()
            .toString();
        this.$data.activeMinute = (this.currentDate as Date)
            .getMinutes()
            .toString();
    }

    updateCurrentTime(): void {
        const newDate = new Date(this.currentDate as Date);
        newDate.setHours(Number(this.$data.activeHour));
        newDate.setMinutes(Number(this.$data.activeMinute));
        this.$emit('update:currentDate', newDate);
    }
}
</script>
<style scoped>
.swiper-container {
    height: 40vh;
}

.centered {
    position: absolute;
    width: 100%;
    height: 6vh;
    background-color: rgb(44, 44, 44);
    border-radius: 5px;
    align-self: center;
    justify-self: center;
}
</style>
