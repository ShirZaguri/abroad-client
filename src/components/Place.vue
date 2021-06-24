<template>
    <vs-card
        type="3"
        class="rounded-pill mt-6 mr-6 mr-l-6 ml-12"
        @click="selectTrip"
    >
        <template #title>
            <v-row class="ma-0 pa-0" justify="space-between">
                <h3>{{ name }}</h3>
            </v-row>
        </template>
        <template #img class="am rounded-pill">
            <v-col
                v-if="img"
                class="image"
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
    // TODO: send description from father component
    @Prop() private desc!: string;
    @Prop() private img!: string;
    @Prop() private name!: string;

    get backgroundImage(): string {
        return `../assets/images/${this.img}.jpg`;
    }
    selectTrip(): void {
        this.$emit('select-trip');
    }

    // TODO: add google maps ref
    // goToGoogleMaps() {
    //     window.location.href = this.place.link;
    // }
}
</script>

<style scoped>
.image {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 30vw !important;
    height: 100%;
    border-radius: 40px !important;
}
.theme--dark .vs-card {
    border-radius: 40px !important;
    background-color: var(--card-dark-background) !important;
}
</style>
