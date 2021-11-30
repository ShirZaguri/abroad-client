<template>
    <v-row
        class="
            attraction-card
            my-2
            px-2
            py-3
            rounded-lg
            align-center
            justify-space-between
        "
        :class="[now ? 'now font-weight-bold' : 'font-weight-medium ']"
        light
    >
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
    max-height: 8vh;
}

.now {
    position: relative;
    right: 20px;
    background-image: linear-gradient(to top right, #195bff, #6f42ff);
}
</style>
