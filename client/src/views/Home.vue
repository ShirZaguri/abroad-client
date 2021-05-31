<template>
  <trip-plan />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TripPlan from '@/components/TripPlan.vue'; // @ is an alias to /src

@Component({
  components: {
    TripPlan,
  },
})
export default class Home extends Vue {}
</script>
