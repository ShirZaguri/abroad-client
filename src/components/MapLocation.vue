<template>
    <vl-feature>
        <vl-geom-point :coordinates="[-10, -10]"></vl-geom-point>
        <vl-style-box>
            <vl-style-icon
                src="../assets/flag.png"
                :scale="0.1"
            ></vl-style-icon>
        </vl-style-box>
    </vl-feature>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class MapLocation extends Vue {}
</script>
