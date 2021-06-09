<template>
    <vs-card type="3" class="ma-3" @click="selectTrip">
        <template #title>
            <v-row class="ma-0 pa-0" justify="space-between">
                <h3>{{ name }}</h3>
            </v-row>
        </template>
        <template #img class="am">
            <v-col
                v-if="img"
                class="place"
                :style="{
                    backgroundImage:
                        'url(' + require(`@/assets/images/${img}.jpg`) + ')',
                }"
            ></v-col>
        </template>
        <template #text>
            <p v-if="desc">{{ desc }}</p>
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
    @Prop() private desc!: string;
    @Prop() private img!: string;
    @Prop() private name!: string;

    get backgroundImage() {
        return `../assets/images/${this.img}.jpg`;
    }
    selectTrip() {
        this.$emit('select-trip');
    }
    // goToGoogleMaps() {
    //     window.location.href = this.place.link;
    // }
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
