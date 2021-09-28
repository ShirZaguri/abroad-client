export type DateObject = {
    _id: string;
    startDate?: Date;
    endDate: Date;
};

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

    static closestHourBackwards(dateObjets: DateObject[]): string {
        const isHourBefore: (checkedDate: Date) => boolean = (
            checkedDate: Date,
        ) => {
            const now = new Date();
            return (
                checkedDate.getHours() < now.getHours() ||
                (checkedDate.getHours() === now.getHours() &&
                    checkedDate.getMinutes() < now.getMinutes())
            );
        };

        return DateService.closestBackwards(dateObjets, isHourBefore);
    }

    static closestDayBackwards(dateObjets: DateObject[]): string {
        const isDayBefore: (checkedDate: Date) => boolean = (
            checkedDate: Date,
        ) => {
            const now = new Date();
            return Number(checkedDate) < Number(now);
        };

        return DateService.closestBackwards(dateObjets, isDayBefore);
    }

    private static closestBackwards(
        dateObjets: DateObject[],
        isbackwords: (Date) => boolean,
    ): string {
        const previous: DateObject[] = dateObjets.filter((value) => {
            return isbackwords(value.endDate);
        });

        return previous.length > 0 ? previous[previous.length - 1]._id : '';
    }

    static closestForward(dateObjets: DateObject[]): string | undefined {
        const today = Number(new Date());
        const next: DateObject[] = dateObjets.filter(
            (value) =>
                Number(value.startDate) >= today ||
                Number(value.endDate) >= today,
        );

        return next[0]._id;
    }
}
