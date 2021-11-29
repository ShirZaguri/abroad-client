<template>
    <v-row
        class="
            attraction-card
            mx-2
            my-2
            pa-3
            rounded-lg
            align-center
            justify-space-between
        "
        :class="[now ? 'now font-weight-bold' : 'font-weight-medium ']"
        light
    >
        <span class="font-weight-medium text-subtitle-1 ma-2">
            {{ tripAttraction.attraction.name }}
        </span>
        <span class="text-subtitle-1 mx-2 text--disabled">
            {{ tripAttraction.details.date | hourDate }}
        </span>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { tripAttractionType } from '@/utils/types/trip-attraction-type';

@Component({})
export default class AttractionItem extends Vue {
    @Prop() private tripAttraction!: tripAttractionType;
    @Prop() private now!: boolean;
}
</script>
<style scoped>
.attraction-card {
    width: 70vw;
    background-color: rgba(48, 48, 48, 1);
    overflow-y: auto;
}

.now {
    position: relative;
    right: 20px;
    background-image: linear-gradient(to top right, #195bff, #6f42ff);
}
</style>
