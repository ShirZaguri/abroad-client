<template>
    <div>
        <EditableText :attraction="attraction"></EditableText>
        <vs-button gradient>Navigate</vs-button>
    </div>
</template>

<script lang="ts">
import { attractionType } from '@/utils/types/attraction-type';
import VueCustomizableEditableText from 'vue-customizable-editable-text';
import { Component, Prop, Vue } from 'vue-property-decorator';
import EditableText from './EditableText.vue';

@Component({
    components: {
        VueCustomizableEditableText,
        EditableText,
    },
})
export default class AttractionDetails extends Vue {
    @Prop() attraction?: attractionType;
}
</script>
