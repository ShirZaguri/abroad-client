export default class DateService {
    static datesBetween(startDt, endDt): Date[] {
        const between: Date[] = [];
        const currentDate = new Date(startDt),
            end = new Date(endDt);
        while (currentDate <= end) {
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

    static datesConvert(dates: Date[], format: string): string[] {
        const converts = {
            full: (date: Date) => {
                const day = date.getDate();
                const month = date.getMonth();
                const year = date.getFullYear();
                return [
                    (day < 10 ? '0' : '') + day,
                    (month < 10 ? '0' : '') + month,
                    year,
                ].join('/');
            },
            short: (date: Date) => {
                const day = date.getDate();
                const month = date.getMonth();
                return [
                    (day < 10 ? '0' : '') + day,
                    (month < 10 ? '0' : '') + month,
                ].join('/');
            },
            hour: (date: Date) => {
                const hours = date.getHours();
                const minutes = date.getMinutes();
                return [
                    (hours < 10 ? '0' : '') + hours,
                    (minutes < 10 ? '0' : '') + minutes,
                ].join(':');
            },
        };

        return dates.map((date) => converts[format](date));
    }
}
