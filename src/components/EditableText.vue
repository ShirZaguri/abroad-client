<template>
    <input
        class="editable-text text-h5 font-weight-bold"
        :placeholder="placeholder"
        ref="text"
        :value="text"
        @change="textChanged"
    />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EditableText extends Vue {
    @Prop({ default: false }) focus?: boolean;
    @Prop() placeholder?: string;
    @Prop() text?: string;

    mounted(): void {
        if (this.focus) {
            this.$nextTick(() => {
                (this.$refs.text as HTMLElement).focus();
            });
        }
    }

    textChanged(): void {
        this.$emit('update:text', (this.$refs.text as any).value);
    }
}
</script>

<style scoped>
.editable-text {
    color: white;
    caret-color: #6f42ff;
}
</style>
