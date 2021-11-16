<template>
    <div>
        <!-- <EditableText :attraction="attraction"></EditableText> -->
        <v-textarea
            solo
            background-color="#141417"
            label="description"
            class="mt-4"
            hide-details
        ></v-textarea>
        <v-row no-gutters>
            <PriceInput
                :price="attraction.price"
                style="width: 35vw"
            ></PriceInput>
            <NavigateBotton
                style="width: 35vw"
                :place="attraction.name"
            ></NavigateBotton>
        </v-row>
    </div>
</template>

<script lang="ts">
import { attractionType } from '@/utils/types/attraction-type';
import { Component, Prop, Vue } from 'vue-property-decorator';
import EditableText from './EditableText.vue';
import PriceInput from './PriceInput.vue';
import NavigateBotton from './NavigateBotton.vue';

@Component({
    components: {
        EditableText,
        PriceInput,
        NavigateBotton,
    },
})
export default class AttractionDetails extends Vue {
    @Prop() attraction?: attractionType;
}
</script>
