<template>
    <div>
        <EditableText
            :text="attraction.name"
            placeholder="Attraction Name"
        ></EditableText>
        <v-textarea
            solo
            background-color="#141417"
            label="description"
            class="mt-4 description"
            hide-details
        ></v-textarea>
        <v-row no-gutters>
            <PriceInput
                class="price-input"
                :price="attraction.price"
            ></PriceInput>
            <NavigateButton
                class="navigate-button"
                :place="attraction.name"
            ></NavigateButton>
        </v-row>
    </div>
</template>

<script lang="ts">
import { attractionType } from '@/utils/types/attraction-type';
import { Component, Prop, Vue } from 'vue-property-decorator';
import EditableText from './EditableText.vue';
import NavigateButton from './NavigateButton.vue';
import PriceInput from './PriceInput.vue';

@Component({
    components: {
        EditableText,
        PriceInput,
        NavigateButton,
    },
})
export default class AttractionDetails extends Vue {
    @Prop() attraction?: attractionType;
}
</script>
<style scoped>
.price-input {
    width: 35vw;
}

.navigate-button {
    width: 35vw;
}
</style>
