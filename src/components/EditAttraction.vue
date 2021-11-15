<template>
    <div class="center">
        <vs-dialog
            full-screen
            not-close
            blur
            :value="true"
            class="bottom-dialog"
            :autoWidth="true"
        >
            <template #header>
                <h4 class="not-margin" v-if="attraction">
                    <b>{{ attraction.destination }}</b>
                </h4>
            </template>

            <div class="con-form">
                <vs-input
                    v-model="input1"
                    placeholder="Write your description here"
                ></vs-input>
                <div class="flex">
                    <vs-checkbox v-model="checkbox1">Remember me</vs-checkbox>
                </div>
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button block>Sign In</vs-button>
                </div>
            </template>
        </vs-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { attractionType } from '../utils/types/attraction-type';

@Component({})
export default class AddAttraction extends Vue {
    @Prop() attraction?: attractionType;
    data() {
        return { active: false, input1: '', input2: '', checkbox1: false };
    }
}
</script>

<style scoped>
.bottom-dialog {
    position: fixed !important;
    bottom: 0px !important;
}
.vs-dialog {
    position: fixed !important;
    bottom: 0px !important;
}
</style>
