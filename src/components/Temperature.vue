<template>
    <div class="ma-2">
        <v-row class="ma-0 pa-0" justify="center">
            <span class="mb-1 font-weight-medium">{{ tag }}</span>
        </v-row>
        <v-row class="ma-0 pa-0">
            <v-icon
                class="temperature-icon mx-3 mb-4 gradient"
                :style="temperatureGradientStyle"
            >
                {{ tempIcon }}
            </v-icon>
            <div class="d-flex flex-column">
                <p class="font-weight-medium text-h5 ma-0">
                    {{ temperature }}°C
                </p>
                <p class="font-weight-light text--disabled">Predicted</p>
            </div>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Temperature extends Vue {
    @Prop() private tag!: string;
    @Prop() private temperature!: number;

    get temperatureGradientStyle() {
        const tempMap = {
            cold: { from: '195bff', to: '6f42ff' },
            nice: { from: 'ebca32', to: 'ff9f52' },
            sunny: { from: 'ebca32', to: 'ff9f52' },
            snow: { from: 'dedede', to: 'a0a0a0' },
        };

        const tempColors = tempMap[this.tempType];

        return `
            background: -moz-linear-gradient(top, #${tempColors.from} ,#${tempColors.to},  #${tempColors.to});
            background: -webkit-linear-gradient(top, #${tempColors.from} ,#${tempColors.to},  #${tempColors.to});
            background: linear-gradient(to bottom, #${tempColors.from} ,#${tempColors.to},  #${tempColors.to});
            -webkit-background-clip: text;
            `;
    }

    get tempIcon() {
        const tempMap = {
            cold: 'fas fa-bolt',
            nice: 'fas fa-sun',
            sunny: 'fas fa-sun',
            snow: 'far fa-snowflake',
        };

        return tempMap[this.tempType];
    }

    get tempType() {
        if (this.temperature < 0) return 'snow';
        else if (this.temperature < 8) return 'cold';
        else if (this.temperature < 15) return 'nice';
        return 'sunny';
    }
}
</script>

<style scoped>
.temperature-icon {
    font-size: 11vw;
}

.gradient {
    display: inline;
    -moz-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: rgba(255, 255, 255, 0);
}
</style>
