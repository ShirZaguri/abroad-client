<template>
    <v-row no-gutters class="mt-4">
        <vs-avatar circle size="40" class="coin" @click="nextCoin">
            <i :class="coins[currentCoinIndex]" class="bla"></i>
        </vs-avatar>

        <div class="center content-inputs price">
            <vs-input v-model="price" placeholder="Price" class="pl-4" />
        </div>
    </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PriceInput extends Vue {
    @Prop() price?: number;

    data(): { coins: string[]; currentCoinIndex: number } {
        return {
            coins: [
                'fas fa-dollar-sign',
                'fas fa-euro-sign',
                'fas fa-shekel-sign',
            ],
            currentCoinIndex: 0,
        };
    }

    nextCoin(): void {
        this.$data.currentCoinIndex =
            (this.$data.currentCoinIndex + 1) % this.$data.coins.length;
    }
}
</script>

<style scoped>
.coin {
    position: absolute;
}

.coin:active {
    transition-timing-function: 0.05s;
    transform: scale(1.5, 1.5);
}
</style>
