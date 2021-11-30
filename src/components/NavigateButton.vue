<template>
    <vs-button
        gradient
        class="mt-4 mb-0"
        :href="`https://www.google.com/maps/place/${tripAttraction.attraction.name}`"
    >
        <i class="fas fa-map-marker-alt mr-2"></i>
        <span>Navigate</span>
    </vs-button>
</template>

<script lang="ts">
import { tripAttractionType } from '@/utils/types/trip-attraction-type';
import { Component, InjectReactive, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NavigateButton extends Vue {
    @Prop() place?: string;
    @InjectReactive('tripAttraction')
    private tripAttraction!: tripAttractionType;
}
</script>
