import Vue from 'vue';

Vue.filter('fullDate', (date: Date): string => {
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    const year: number = date.getFullYear();
    return [
        (day < 10 ? '0' : '') + day,
        (month < 10 ? '0' : '') + month,
        year,
    ].join('/');
});

Vue.filter('shortDate', (date: Date): string => {
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    return [(day < 10 ? '0' : '') + day, (month < 10 ? '0' : '') + month].join(
        '/',
    );
});

Vue.filter('hourDate', (date: Date): string => {
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    return [
        (hours < 10 ? '0' : '') + hours,
        (minutes < 10 ? '0' : '') + minutes,
    ].join(':');
});

Vue.filter('day', (date: Date): number => {
    return date.getDate();
});

Vue.filter('shortMonth', (date: Date): string => {
    return date.toLocaleDateString('default', { month: 'short' }).toUpperCase();
});
