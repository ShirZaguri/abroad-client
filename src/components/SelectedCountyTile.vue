<template>
    <vl-layer-vector-tile
        ref="vtLayer"
        :declutter="true"
        :format-factory="createMvtFormat"
    >
        <vl-source-vector-tile
            :url="vtUrl"
            ref="source"
        ></vl-source-vector-tile>
        <vl-style-func
            :key="$vuetify.theme.dark"
            :factory="vtStyleFuncFactory"
        ></vl-style-func>
    </vl-layer-vector-tile>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ol from 'vuelayers';
import { VectorSource, VectorTile } from 'ol/source/Vector';
import { MVT } from 'ol/format';
import { Feature } from 'ol';
import { createStyle } from 'vuelayers/lib/ol-ext';
// TODO: remove unused code
@Component({})
export default class SelectedCountry extends Vue {
    @Prop() private olMap: any;
    // mounted() {
    //     this.$nextTick(function () {
    //         (this.$refs.vtLayer as any)
    //             ?.getSource()
    //             .on('tileloadend', function (evt) {
    //                 debugger;
    //                 var z = evt.tile.getTileCoord()[0];
    //                 var features = evt.tile.getFeatures();
    //             });
    //     });
    // }
    created() {
        // (this.$refs.vtLayer as any)
        //     ?.getSource()
        //     .on('tileloadend', function (evt) {
        //         var z = evt.tile.getTileCoord()[0];
        //         debugger;
        //         var features = evt.tile.getFeatures();
        // features.forEach(function (feature) {
        //     // each vector tile has its own set of feature ids, but duplicates are not allowed in normal vector sources
        //     feature.setId(undefined);
        // });
        // if (!Array.isArray(this.$data.featuresForZ[z])) {
        //     this.$data.featuresForZ[z] = [];
        // }
        // this.$data.featuresForZ[z] = this.$data.featuresForZ[z].concat(features);
        // if (z === viewZ) {
        //     vsRefresh();
        // }
        // });
    }
    data() {
        return {
            vtUrl:
                'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/' +
                'ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',
            vtIdProp: 'iso_a3',
            vtSelection: {},
            vtSelectMode: 'single',
            featuresForZ: [],
        };
    }

    get vtLayer(): Vue & { refresh: () => boolean } {
        return this.$refs.vtLayer as Vue & { refresh: () => boolean };
    }

    createMvtFormat(): MVT {
        return new MVT({
            featureClass: Feature,
        });
    }
    vtStyleFuncFactory() {
        return (feature: Feature): createStyle => {
            let selected =
                !!this.$data.vtSelection[feature.get(this.$data.vtIdProp)];
            return selected
                ? createStyle({
                      radius: 5,
                      fillColor: 'rgba(167,151,248, 0.2)',
                      strokeColor: 'rgba(99,69,255,0.8)',
                      strokeWidth: 2,
                  })
                : this.$vuetify.theme.dark
                ? createStyle({
                      radius: 5,
                      fillColor: 'rgba(20,20,20,0.8)',
                      strokeColor: 'gray',
                      strokeWidth: 1,
                  })
                : createStyle({
                      radius: 5,
                      fillColor: 'rgba(20,20,20,0)',
                  });
        };
    }
    onMapClick(features: Feature): void {
        // let features = this.olMap.$map.getFeaturesAtPixel(evt.pixel);
        debugger;
        // (this.$refs.vtLayer as any)
        //     ?.getSource()
        //     .on('tileloadend', function (evt) {
        //         var z = evt.tile.getTileCoord()[0];
        //         var features = evt.tile.getFeatures();
        //     });

        if (!features) {
            this.$data.vtSelection = {};
            // force redraw of layer style
            this.vtLayer.refresh();
            return;
        }

        let feature = features[0];
        let fid = feature.get(this.$data.vtIdProp);

        if (this.$data.vtSelectMode === 'single') {
            this.$data.vtSelection = {};
        }

        // add selected feature to lookup
        this.$data.vtSelection[fid] = feature;

        // force redraw of layer style
        this.vtLayer?.refresh();
    }
}
</script>
<style scoped></style>
