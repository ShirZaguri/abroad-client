<template>
    <v-row no-gutters class="mt-4">
        <vs-avatar circle size="40" class="coin" @click="nextCoin">
            <i :class="coins[currentCoinIndex]"></i>
        </vs-avatar>

        <vs-input
            ref="price"
            v-model="value"
            placeholder="Price"
            class="pl-6 price-input"
            @change="priceChanged"
        />
    </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PriceInput extends Vue {
    @Prop() private price?: number;

    data(): {
        coins: string[];
        currentCoinIndex: number;
        // TODO: change vs-input to input and than use $refs to get input value
        value: number | undefined;
    } {
        return {
            coins: [
                'fas fa-dollar-sign',
                'fas fa-euro-sign',
                'fas fa-shekel-sign',
            ],
            currentCoinIndex: 0,
            value: this.price,
        };
    }

    priceChanged(): void {
        this.$emit('update:price', this.$data.value);
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
