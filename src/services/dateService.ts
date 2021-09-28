export default class DateService {
    static datesBetween(startDt: Date, endDt: Date): Date[] {
        const between: Date[] = [];
        const currentDate = new Date(startDt);
        while (currentDate <= endDt) {
            between.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return between;
    }

    static datesAreOnSameDay(first: Date, second: Date): boolean {
        return (
            first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth() &&
            first.getDate() === second.getDate()
        );
    }

    static converts = {
        full: (date: Date): string => {
            const day: number = date.getDate();
            const month: number = date.getMonth();
            const year: number = date.getFullYear();
            return [
                (day < 10 ? '0' : '') + day,
                (month < 10 ? '0' : '') + month,
                year,
            ].join('/');
        },
        short: (date: Date): string => {
            const day: number = date.getDate();
            const month: number = date.getMonth();
            return [
                (day < 10 ? '0' : '') + day,
                (month < 10 ? '0' : '') + month,
            ].join('/');
        },
        hour: (date: Date): string => {
            const hours: number = date.getHours();
            const minutes: number = date.getMinutes();
            return [
                (hours < 10 ? '0' : '') + hours,
                (minutes < 10 ? '0' : '') + minutes,
            ].join(':');
        },
    };

    static datesConvert(dates: Date[], format: string): string[] {
        return dates.map((date) => DateService.converts[format](date));
    }
}
