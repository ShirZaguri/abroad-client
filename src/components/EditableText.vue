<template>
    <vue-customizable-editable-text
        ref="editable-text"
        v-model="attraction.name"
        identify="editableTextIdentify"
        @editableOn="editableOn"
    >
        <!-- on editable -->
        <template #textbox="v">
            <input
                class="input-textbox text-h5"
                :value="v.value"
                ref="input"
                @blur="blur"
                placeholder="attraction"
            />
        </template>

        <!-- or not editable -->
        <template #default="v">
            <span class="text-h5">
                {{ v.value }}
            </span>
        </template>

        <!-- revert button -->
        <template #revert>
            <button style="display: none !important"></button>
        </template>
    </vue-customizable-editable-text>
</template>

<script lang="ts">
import { attractionType } from '@/utils/types/attraction-type';
import VueCustomizableEditableText from 'vue-customizable-editable-text';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {
        VueCustomizableEditableText,
    },
})
export default class EditableText extends Vue {
    @Prop() attraction?: attractionType;

    blur(): void {
        console.log('[app.vue] catch blur', ...arguments);
        (this.$refs['editable-text'] as any).editableOff();
    }

    editableOn(): void {
        this.$nextTick(() => {
            console.log('inside ' + this.$refs['input']);
            (this.$refs['input'] as any).select();
        });
    }
}
</script>

<style scoped>
.input-textbox {
    color: white;
    caret-color: #6f42ff;
}
</style>
