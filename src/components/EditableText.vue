<template>
    <input
        class="editable-text text-h5 font-weight-bold"
        v-model="text"
        placeholder="Attraction Name"
        ref="text"
    />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EditableText extends Vue {
    @Prop() text?: string;
    @Prop({ default: false }) focus?: boolean;

    mounted(): void {
        if (this.focus) {
            this.$nextTick(() => {
                (this.$refs.text as HTMLElement).focus();
            });
        }
    }
}
</script>

<style scoped>
.editable-text {
    color: white;
    caret-color: #6f42ff;
}
</style>
