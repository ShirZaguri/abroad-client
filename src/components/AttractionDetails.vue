<template>
    <div>
        <v-row align="center">
            <v-col cols="9">
                <EditableText
                    placeholder="Attraction Name"
                    :text.sync="tripAttraction.attraction.name"
                ></EditableText>
            </v-col>
            <v-col class="d-flex justify-end">
                <vs-button icon color="danger" border @click="deleteAttraction">
                    <i class="fas fa-trash"></i>
                </vs-button>
            </v-col>
        </v-row>
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
import AttractionService from '@/services/attractionService';
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

    // deleteAttraction(): void {
    //     AttractionService.
    // }
}
</script>
<style scoped>
.price {
    width: 35vw;
}

.navigate {
    width: 35vw;
}

.fa-trash {
    font-size: 1em !important;
}
</style>
