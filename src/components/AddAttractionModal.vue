<template>
    <div class="center">
        <vs-dialog
            :loading="loading"
            @close="closeDialog"
            prevent-close
            v-model="active"
        >
            <template #header>
                <h4 class="not-margin">Add Attraction</h4>
            </template>

            <div class="con-form">
                <div class="center con-selects">
                    <vs-switch v-model="isNew">New Attraction </vs-switch>
                    <vs-input
                        v-if="isNew"
                        v-model="newAttraction.name"
                        placeholder="Attraction Name"
                    />
                    <vs-select
                        v-else
                        placeholder="Attraction Name"
                        v-model="newAttraction.name"
                    >
                        <vs-option
                            v-for="(attraction, index) in attractions"
                            :key="index"
                            :label="attraction.name"
                            :value="attraction.name"
                        >
                            {{ attraction.name }}
                        </vs-option>
                    </vs-select>
                    <vs-input
                        v-model="newAttraction.img"
                        placeholder="Image Source"
                    />
                    <v-date-picker
                        locale="en-in"
                        v-model="newAttraction.date"
                        no-title
                    ></v-date-picker>
                </div>
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button block @click="addAttraction">
                        Add To Trip
                    </vs-button>
                </div>
            </template>
        </vs-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {},
})
export default class AddAttractionModal extends Vue {
    @Prop() private active!: boolean;

    data() {
        return {
            isNew: true,
            input1: '',
            checkbox1: false,
            loading: true,
            attractions: [],
            newAttraction: {
                name: '',
                img: '',
                date: null,
            },
        };
    }

    async created() {
        this.$data.loading = true;
        const data = await fetch('http://localhost:3000/api/attractions/');
        this.$data.attractions = (await data.json()).attractions;
        this.$data.loading = false;
    }

    closeDialog() {
        this.$emit('update:active', false);
    }

    addAttraction() {
        console.log('sdfsdfsdf');
        this.$emit('add-attraction', this.$data.newAttraction);
        this.closeDialog();
    }
}
</script>
 <style>
.not-margin {
    margin: 0px;
    font-weight: normal;
    padding: 10px;
}
.con-form {
    width: 100%;
}
.con-form .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.con-form .flex a {
    font-size: 0.8rem;
    opacity: 0.7;
}
.con-form .flex a:hover {
    opacity: 1;
}
.con-form .vs-checkbox-label {
    font-size: 0.8rem;
}
.con-form .vs-input-content {
    margin: 10px 0px;
    width: calc(100%);
}
.con-form .vs-input-content .vs-input {
    width: 100%;
}
.footer-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: calc(100%);
}
.footer-dialog .new {
    margin: 0px;
    margin-top: 20px;
    padding: 0px;
    font-size: 0.7rem;
}
.footer-dialog .new a {
    color: rgba(var(--vs-primary), 1) !important;
    margin-left: 6px;
}
.footer-dialog .new a:hover {
    text-decoration: underline;
}
.footer-dialog .vs-button {
    margin: 0px;
}
</style>
