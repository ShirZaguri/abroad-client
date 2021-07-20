<template>
    <vl-map
        ref="map"
        :load-tiles-while-animating="true"
        :load-tiles-while-interacting="true"
        data-projection="EPSG:4326"
        :style="{ width: `${precentWidth}%` }"
        @click="triggerSelect"
    >
        <!-- @pointermove="triggerSelect" -->
        <vl-view
            ref="mapView"
            ident="view"
            :zoom.sync="zoom"
            :center.sync="center"
            :rotation.sync="rotation"
        ></vl-view>

        <MapLocation v-if="pinLocations"></MapLocation>

        <vl-layer-tile id="osm">
            <vl-source-osm></vl-source-osm>
        </vl-layer-tile>

        <SelectedCountyTile ref="selected" :olMap="map"></SelectedCountyTile>
    </vl-map>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SelectedCountyTile from './SelectedCountyTile.vue';
import MapLocation from './MapLocation.vue';
// import * as eventCondition from 'ol/events/condition';

@Component({
    components: {
        SelectedCountyTile,
        MapLocation,
    },
})
export default class olMap extends Vue {
    @Prop({ default: 100 }) private precentWidth!: number;
    @Prop({ default: false }) private pinLocations!: boolean;

    mounted(): void {
        (this.$refs.map as any)?.$el.onmouseover((event: Event) => {
            this.triggerSelect(event);
        });
    }
    // get pointerMove() {
    //     return eventCondition.pointerMove;
    // }

    data(): {
        zoom: number;
        center: number[];
        rotation: number;
        geolocPosition: null;
    } {
        return {
            zoom: 2,
            center: [0, 0],
            rotation: 0,
            geolocPosition: null,
        };
    }

    triggerSelect(event: any): void {
        let features = (this.$refs.map as any)?.$map.getFeaturesAtPixel(
            event.pixel,
        );
        (this.$refs.selected as SelectedCountyTile)?.onMapClick(features);
    }
}
</script>
