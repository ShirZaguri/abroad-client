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
                    <vs-switch v-model="isNew">New Attraction</vs-switch>
                    <vs-input
                        v-if="isNew"
                        v-model="newAttraction.attraction.name"
                        placeholder="Attraction Name"
                    />
                    <vs-select
                        v-else
                        placeholder="Attraction Name"
                        v-model="newAttraction.attraction.name"
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
                        v-model="newAttraction.attraction.img"
                        placeholder="Image Source"
                    />
                    <v-date-picker
                        locale="en-in"
                        v-model="attractionDate"
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
import { attractionType } from '@/utils/types/attraction-type';
import { tripAttractionType } from '@/utils/types/trip-attraction-type';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {},
})
export default class AddAttractionModal extends Vue {
    @Prop() private active!: boolean;

    set attractionDate(value: string) {
        this.$data.newAttraction.details.date = new Date(value);
    }

    get attractionDate(): string {
        return this.$data.newAttraction.details.date?.toISOString();
    }

    data(): {
        isNew: boolean;
        loading: boolean;
        attractions: attractionType[];
        newAttraction: tripAttractionType;
    } {
        return {
            isNew: true,
            loading: true,
            attractions: [],
            newAttraction: {
                _id: '',
                attraction: {
                    name: '',
                    img: '',
                    description: '',
                },
                details: {
                    date: new Date(),
                    price: 0,
                },
            },
        };
    }

    async created(): Promise<void> {
        this.$data.loading = true;
        this.emptyNewAttraction();
        const data = await fetch(process.env.VUE_APP_GET_ALL_ATTRACTIONS);
        this.$data.attractions = (await data.json()).attractions;
        this.$data.loading = false;
    }

    emptyNewAttraction(): void {
        this.$data.newAttraction = {
            _id: '',
            attraction: {
                name: '',
                img: '',
                description: '',
            },
            details: {
                date: new Date(),
                price: 0,
            },
        };
    }

    closeDialog(): void {
        this.emptyNewAttraction();
        this.$emit('update:active', false);
    }

    addAttraction(): void {
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
