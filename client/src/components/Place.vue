<template>
    <vs-card type="3" class="ma-3" @click="selectTrip">
        <template #title>
            <v-row class="ma-0 pa-0" justify="space-between">
                <h3>{{ place.name }}</h3>
            </v-row>
        </template>
        <template #img class="am">
            <v-col
                v-if="place.img"
                @click="goToGoogleMaps"
                class="place"
                :style="{
                    backgroundImage:
                        'url(' +
                        require(`@/assets/images/${place.img}.jpg`) +
                        ')',
                }"
            ></v-col>
        </template>
        <template #text>
            <p v-if="place.desc">{{ place.desc }}</p>
            <p v-else>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
        </template>
    </vs-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Place extends Vue {
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Prop() private place!: any;
    get backgroundImage() {
        return `../assets/images/${this.place.type}.jpg`;
    }
    selectTrip() {
        this.$emit('select-trip');
    }
    goToGoogleMaps() {
        window.location.href = this.place.link;
    }
}
</script>

<style scoped>
.place {
    background-repeat: no-repeat;
    background-size: cover;
    width: 50vw;
    height: 100%;
}
.am {
    width: 30vw !important;
}
</style>
