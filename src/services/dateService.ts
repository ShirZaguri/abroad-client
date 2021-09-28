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
}
