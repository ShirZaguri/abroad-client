<template>
    <div class="ma-2">
        <v-row class="ma-0 pa-0" justify="center">
            <span class="mb-1 font-weight-bold">{{ tag }}</span>
        </v-row>
        <v-row class="ma-0 pa-0" justify="center">
            <svg
                class="mx-2"
                height="100%"
                width="100%"
                :viewBox="iconsMap[mode].viewBox"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
            >
                <defs>
                    <linearGradient :id="mode" gradientTransform="rotate(90)">
                        <stop
                            offset="5%"
                            :stop-color="'#' + iconsMap[mode].from"
                        />
                        <stop
                            offset="70%"
                            :stop-color="'#' + iconsMap[mode].to"
                        />
                    </linearGradient>
                </defs>

                <path :d="iconsMap[mode].path" :fill="`url('#${mode}')`" />
            </svg>

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
import icons from '@/assets/icons/icons.json';

@Component({})
export default class Temperature extends Vue {
    @Prop() private tag!: string;
    @Prop() private temperature!: number;
    @Prop() private mode!: string;

    data() {
        return { iconsMap: icons };
    }
}
</script>

<style scoped>
svg {
    max-width: 13vw;
    max-height: 6.5vh;
}
.temperature-icon {
    font-size: 10.5vw;
}

.gradient {
    display: inline;
    -moz-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: rgba(255, 255, 255, 0);
}

.icon {
    width: 1em;
    height: 1em;
    /* fill: red; */
    background-image: linear-gradient(
        -90deg,
        rgb(252, 179, 164) 0%,
        rgb(218, 88, 153) 100%
    );
}
</style>
