<template display="flex">
    <div v-if="loading">
        <v-row
            class="place-loader mt-1 mb-3 ml-4 mr-4 .d-flex"
            v-for="i in 4"
            :key="i"
        >
            <v-col :cols="screenAdjustments.imageCols" class="ma-0 pa-0">
                <v-skeleton-loader
                    :boilerplate="PLACE_LOADER.BOILERPLATE"
                    :type="PLACE_LOADER.IMAGE_LOADER_TYPE"
                    :tile="PLACE_LOADER.TILE_LOADER"
                    :max-height="screenAdjustments.maxHeight"
                    class="mx-auto ma-3 rounded-xl"
                ></v-skeleton-loader>
            </v-col>
            <v-col
                :cols="screenAdjustments.infoCols"
                class="mt-4 mb-4 ml-2 pt-0 pl-0"
            >
                <v-skeleton-loader
                    :boilerplate="PLACE_LOADER.BOILERPLATE"
                    :type="PLACE_LOADER.TITLE_LOADER_TYPE"
                    :tile="PLACE_LOADER.TILE_LOADER"
                    class="mx-auto ma-3"
                ></v-skeleton-loader>
                <v-skeleton-loader
                    :boilerplate="PLACE_LOADER.BOILERPLATE"
                    :type="PLACE_LOADER.TEXT_LOADER_TYPE"
                    :tile="PLACE_LOADER.TILE_LOADER"
                    class="mx-auto ma-3"
                ></v-skeleton-loader>
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { PLACE_LOADER } from '@/utils/constants/place-loader-constants';

@Component({})
export default class placeHolder extends Vue {
    @Prop() private loading!: boolean;
    private readonly PLACE_LOADER = PLACE_LOADER;

    // TODO: change type to somthing nornmal
    data(): { dragOptions: any } {
        return {
            dragOptions: {
                animation: 200,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost',
            },
        };
    }

    get screenAdjustments(): {
        imageCols: number;
        infoCols: number;
        maxHeight: number;
    } {
        return this.PLACE_LOADER.SCREEN_ADJUSTMENTS[
            this.$vuetify.breakpoint.name
        ];
    }
}
</script>
<style scoped>
/* @media screen and (max-width: 600px) {
    .place-loader {
        height: 110px;
    }
    .v-skeleton-loader.image-loader {
        max-height: 110px;
    }
}
@media screen and (max-width: 600px) {
    .place-loader {
        height: 110px;
    }
    .v-skeleton-loader.image-loader {
        max-height: 110px;
    }
} */
</style>
