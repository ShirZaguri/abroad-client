<template>
    <v-row
        class="
            attraction-card
            ma-2
            pa-3
            rounded-lg
            align-center
            justify-space-between
        "
        :class="[now ? 'now font-weight-bold' : 'font-weight-medium ']"
        light
    >
        <!-- <v-icon
            :color="attraction.details.done ? 'primary' : 'white'"
            size="15"
        >
            fas fa-check
        </v-icon> -->
        <span class="font-weight-medium text-subtitle-1 ma-2">
            {{ attraction.attraction.name }}
        </span>
        <span class="text-subtitle-1 mx-2 text--disabled">
            {{ attraction.details.date | hourDate }}
        </span>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { tripAttractionType } from '@/utils/types/trip-attraction-type';

@Component({})
export default class AttractionItem extends Vue {
    @Prop() private attraction!: tripAttractionType;
    @Prop() private now!: boolean;

    get img(): string {
        //TODO: place default image
        return this.attraction.attraction.img
            ? require(`../assets/images/${this.attraction.attraction.img}.jpg`)
            : `../assets/images/zans.jpg`;
    }
}
</script>
<style scoped>
.attraction-card {
    width: 72vw;
    background-color: rgba(48, 48, 48, 1);
}

.now {
    position: relative;
    right: 20px;
    background-image: linear-gradient(to top right, #195bff, #6f42ff);
}
</style>
