<template>
    <vl-map
        :load-tiles-while-animating="true"
        :load-tiles-while-interacting="true"
        data-projection="EPSG:4326"
        :style="{ width: `${precentWidth}%` }"
    >
        <vl-view
            :zoom.sync="zoom"
            :center.sync="center"
            :rotation.sync="rotation"
        ></vl-view>

        <vl-geoloc @update:position="geolocPosition = $event">
            <template slot-scope="geoloc">
                <vl-feature v-if="geoloc.position" id="position-feature">
                    <vl-geom-point
                        :coordinates="geoloc.position"
                    ></vl-geom-point>
                    <vl-style-box>
                        <vl-style-icon
                            src="_media/marker.png"
                            :scale="0.4"
                            :anchor="[0.5, 1]"
                        ></vl-style-icon>
                    </vl-style-box>
                </vl-feature>
            </template>
        </vl-geoloc>

        <vl-layer-tile id="osm">
            <vl-source-osm></vl-source-osm>
        </vl-layer-tile>
    </vl-map>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class olMap extends Vue {
    @Prop({ default: 100 }) private precentWidth!: number;

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

    created(): void {
        // if (navigator.geolocation) {
        //     navigator.geolocation.watchPosition(
        //         this.setNewGeoLoc,
        //         this.setNewGeoLoc,
        //         {
        //             enableHighAccuracy: true,
        //         },
        //     );
        // }
    }

    // setNewGeoLoc(newGeoLoc: any): void {
    //     console.log(newGeoLoc);
    //     this.$data.geolocPosition = newGeoLoc;
    // }
}
</script>

<style scoped>
</style>
