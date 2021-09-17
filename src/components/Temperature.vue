<template>
    <div class="ma-2">
        <v-row class="ma-0 pa-0" justify="center">
            <v-chip dark class="mb-1">{{ tag }}</v-chip>
        </v-row>
        <v-row class="ma-0 pa-0">
            <v-icon color="white" class="temperature-icon mx-3 mb-4">
                fas fa-bolt
            </v-icon>
            <div class="d-flex flex-column">
                <p class="font-weight-medium text-h4 ma-0">
                    {{ temperature }}°C
                </p>
                <p class="font-weight-light text--disabled">Predicted</p>
            </div>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Temperature extends Vue {
    @Prop() private tag!: string;
    @Prop() private temperature!: number;
}
</script>

<style scoped>
.temperature-icon {
    font-size: 13vw;
}
</style>
