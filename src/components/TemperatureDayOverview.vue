<template>
    <v-row justify="center" class="pb-2">
        <v-col cols="6" class="ma-0 pa-0">
            <Temperature tag="day" :temperature="day.temp" :mode="day.icon" />
        </v-col>
        <v-divider class="my-6" vertical color="white"></v-divider>
        <v-col cols="6" class="ma-0 pa-0">
            <Temperature
                tag="night"
                :temperature="night.temp"
                :mode="night.icon"
            />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Temperature from '@/components/Temperature.vue';
import WeatherService from '@/services/weatherService';

@Component({ components: { Temperature } })
export default class TemperatureDayOverview extends Vue {
    @Prop() private location!: string;
    @Prop() private date!: Date;

    data(): {
        day: { temp: number; icon: string };
        night: { temp: number; icon: string };
    } {
        return {
            day: {
                temp: 10,
                icon: 'storm',
            },
            night: {
                temp: 4,
                icon: 'snow',
            },
        };
    }

    @Watch('date')
    onDateChange(value: number): void {
        this.fetchTemperature();
    }

    async created(): Promise<void> {
        this.fetchTemperature();
    }

    async fetchTemperature(): Promise<void> {
        try {
            const dayWeather = await WeatherService.getWeather(
                this.location,
                this.date.getTime(),
            );
            this.$data.day = dayWeather.day;
            this.$data.night = dayWeather.night;
        } catch (err) {
            alert('Error in weather fetching..');
        }
    }
}
</script>
