<template>
    <trip-plan />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TripPlan from '@/components/TripPlan.vue';

@Component({
    components: {
        TripPlan,
    },
})
export default class Plan extends Vue {}
</script>
