<template>
    <v-row no-gutters class="mt-4">
        <vs-avatar circle size="40" class="coin" @click="openLink">
            <i class="fas fa-paperclip"></i>
        </vs-avatar>

        <vs-input
            ref="link"
            v-model="value"
            placeholder="Documents Link"
            class="pl-6 price-input"
            @change="linkChanged"
        />
    </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DocumentsLinkInput extends Vue {
    @Prop() private documentsLink?: string;

    data(): {
        value: string | undefined;
    } {
        return {
            value: this.documentsLink,
        };
    }

    openLink(): void {
        window.open(this.$data.value, '_blank');
    }

    priceChanged(): void {
        this.$emit('update:documentsLink', this.$data.value);
    }

    linkChanged(): void {
        //TODO: update:documentsLink
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
