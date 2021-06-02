<template>
    <vs-card type="3" class="ma-3">
        <template #title>
            <v-row class="ma-0 pa-0" justify="space-between">
                <h3>{{ place.name }}</h3>
                <v-menu rounded offset-y>
                    <template v-slot:activator="{ attrs, on }">
                        <v-icon color="#f1eef0" left v-bind="attrs" v-on="on">
                            mdi-dots-vertical
                        </v-icon>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in days"
                            :key="index"
                            link
                            @click="movePlace(item)"
                        >
                            <v-list-item-title
                                v-text="item"
                            ></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-row>
        </template>
        <template #img class="am">
            <v-col
                @click="goToGoogleMaps"
                class="place"
                :style="{
                    backgroundImage:
                        'url(' +
                        require(`@/assets/images/${place.type}.jpg`) +
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
    emitClicked() {
        this.$emit('clicked');
    }
    movePlace(newDate) {
        this.$emit('moveTo', newDate);
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
