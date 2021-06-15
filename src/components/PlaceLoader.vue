<template display="flex">
    <div v-if="loading">
        <v-row class="ml-4 mr-3" v-for="i in 4" :key="i">
            <v-col cols="2" class="ma-0 pa-0">
                <v-skeleton-loader
                    ref="skeleton"
                    :boilerplate="boilerplate"
                    :type="type"
                    :tile="tile"
                    max-width="250"
                    max-height="150"
                    style="border-radius: 25px"
                    class="mx-auto ma-3"
                ></v-skeleton-loader>
            </v-col>
            <v-col cols="1" style="padding: 0; margin: 15px">
                <v-skeleton-loader
                    ref="skeleton"
                    :boilerplate="boilerplate"
                    :type="type2"
                    :tile="tile"
                    max-width="150"
                    class="mx-auto ma-3"
                ></v-skeleton-loader>
                <v-skeleton-loader
                    ref="skeleton"
                    :boilerplate="boilerplate"
                    :type="type3"
                    :tile="tile"
                    max-width="150"
                    class="mx-auto ma-3"
                ></v-skeleton-loader>
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class placeHolder extends Vue {
    @Prop() private loading!: boolean;
    // TODO: change type to somthing nornmal
    data() {
        return {
            boilerplate: false,
            tile: false,
            type: 'image',
            type2: 'heading',
            type3: 'paragraph',
            types: [],
            dragOptions: {
                animation: 200,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost',
            },
        };
    }
}
</script>
