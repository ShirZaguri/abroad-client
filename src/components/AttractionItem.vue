<template>
    <v-row class="mx-2 my-1 pa-0" align="center" light @click="toggleDone">
        <v-icon
            :color="attraction.details.done ? 'primary' : 'white'"
            size="15"
        >
            fas fa-check
        </v-icon>
        <v-col cols="3">
            <span
                class="text-subtitle-1 mx-2"
                :class="[
                    now
                        ? 'font-weight-bold primary--text'
                        : 'attraction-hour font-weight-medium ',
                ]"
            >
                {{ hour }}
            </span>
        </v-col>
        <vs-avatar>
            <img class="attraction-img" :src="img" alt="" />
        </vs-avatar>
        <span class="font-weight-medium text-subtitle-1 ma-2 attraction-name">
            {{ attraction.attraction.name }}
        </span>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { tripAttractionType } from '@/utils/types/trip-attraction-type';
import DateService from '@/services/dateService';

@Component({})
export default class AttractionItem extends Vue {
    @Prop() private attraction!: tripAttractionType;
    @Prop() private now!: boolean;

    get hour(): string {
        return DateService.datesConvert(
            [this.attraction.details.date],
            'hour',
        )[0];
    }

    get img(): string {
        //TODO: place default image
        return this.attraction.attraction.img
            ? require(`../assets/images/${this.attraction.attraction.img}.jpg`)
            : `../assets/images/zans.jpg`;
    }

    toggleDone(): void {
        //TODO: change done state
        this.attraction.details.done = true;
    }
}
</script>
<style scoped>
.theme--dark .attraction-name {
    color: var(--title-dark-color);
}

.vs-avatar {
    background-size: contain;
}

.attraction-img {
    height: inherit;
}

.attraction-hour {
    color: var(--title-disabled-color);
}
</style>
