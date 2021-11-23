<template>
    <v-row class="dropdown justify-center">
        <ul class="hours justify-center">
            <li class="hint">HH</li>
            <li
                v-for="(item, i) in hours"
                :key="i"
                class="d-flex justify-center"
                :class="activeHour == i ? 'active' : ''"
                @click="activeHour = i"
            >
                {{ item }}
            </li>
        </ul>
        <ul class="minutes">
            <li class="hint">MM</li>
            <li
                v-for="(item, i) in hours"
                :key="i"
                class="d-flex justify-center"
                :class="activeMinute == i ? 'active' : ''"
                @click="activeMinute = i"
            >
                {{ item }}
            </li>
        </ul>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TimePicker extends Vue {
    data(): {
        activeHour: number;
        activeMinute: number;
        hours: string[];
    } {
        return {
            activeHour: 0,
            activeMinute: 0,
            hours: [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '07',
                '07',
                '07',
                '07',
                '07',
                '07',
                '07',
                '07',
            ],
        };
    }
}
</script>
<style scoped>
ul {
    height: 15em;
    list-style-type: none;
    width: 50%;
    /* overflow-y: scroll; */
    -ms-overflow-style: none;
    scrollbar-width: none; /* Firefox */
    position: static;
    margin-bottom: 2rem;
    max-height: 15em;
    overflow: auto;
    position: static;
}
ul::-webkit-scrollbar {
    display: none;
}

li:first-child {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

:focus {
    outline: none !important;
}

.hint {
    color: #a5a5a5;
    cursor: default;
    font-size: 0.8em;
    position: fixed;
}

li {
    width: 100%;
    padding: 0.3em 0;
}
li.active {
    background-color: #6f42ff !important;
}

.time-picker::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    cursor: pointer;
}

.dropdown {
    border-radius: 30px;
    background-color: transparent;
    width: 15em;
    height: 15em;
    font-weight: 400;
    /* position: absolute; */
    /* z-index: 5; */
    top: calc(2.2em + 2px);
    left: 0;
    padding-top: 10px;
    position: relative !important;
}
</style>
