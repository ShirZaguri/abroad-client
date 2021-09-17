<template>
    <div>
        <v-row
            id="destination-bg"
            class="pt-6 ma-0"
            justify="center"
            align="center"
        >
            <div class="d-flex flex-column justify-center text-center">
                <h1 id="destination-title">Vienna</h1>
                <vs-button gradient class="closest-trip ml-6 mb-0">
                    08/12/2021 - 12/12/2021
                </vs-button>
            </div>
        </v-row>
        <!-- <v-tabs center-active dark>
            <v-tab v-for="date in dates" :key="date">
                <template v-slot>
                  
                </template>
            </v-tab>
        </v-tabs> -->
        <v-row>
            <v-chip
                v-for="date in dates"
                :key="date"
                color="white"
                class="ma-2 font-weight-black"
                text-color="#5c39d0"
            >
                {{ date }}
            </v-chip>
        </v-row>
        <v-row id="temperature-holder" class="ma-0 pa-5" justify="center">
            <Temperature :tag="'day'" :temperature="'16'" />
            <v-divider class="my-3 mx-2" vertical color="white"></v-divider>
            <Temperature :tag="'night'" :temperature="'-3'" />
        </v-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Temperature from '../components/Temperature.vue';

@Component({
    components: {
        Temperature,
    },
})
export default class TripMobile extends Vue {
    private dates = ['08/12', '09/12', '10/12', '11/12', '12/12'];
}
</script>
<style scoped>
#destination-bg {
    height: 25vh;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 100)),
        url('../assets/images/vienna.jpg');
    /* background: url('../assets/images/vienna.jpg'); */
    /* box-shadow: 0 0 0px 8px white inset; */
    background-size: cover;
}

#destination-title {
    font-size: 13vw;
}

#temperature-holder {
    /* width: 80vw; */
}
</style>
