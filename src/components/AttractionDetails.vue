<template>
    <div>
        <EditableText
            placeholder="Attraction Name"
            :text.sync="tripAttraction.attraction.name"
        ></EditableText>
        <v-textarea
            solo
            background-color="#141417"
            label="description"
            class="mt-4 description"
            v-model="tripAttraction.attraction.description"
            hide-details
        ></v-textarea>
        <v-row no-gutters>
            <PriceInput
                class="price"
                :price.sync="tripAttraction.attraction.price"
            ></PriceInput>
            <NavigateButton class="navigate"></NavigateButton>
        </v-row>
    </div>
</template>

<script lang="ts">
import { tripAttractionType } from '@/utils/types/trip-attraction-type';
import { Component, InjectReactive, Vue } from 'vue-property-decorator';
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
    @InjectReactive('tripAttraction')
    private tripAttraction?: tripAttractionType;
}
</script>
<style scoped>
.price {
    width: 35vw;
}

.navigate {
    width: 35vw;
}
</style>
