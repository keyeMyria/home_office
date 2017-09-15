// @flow
import moment from 'moment';

export function isThisWeek(date: Date | string): boolean {
    return moment(date).isSame(new Date(), 'week');
}

export function isNextWeek(date: Date | string): boolean {
    const nextWeek = moment().add(1, 'weeks');
    return moment(date).isSame(nextWeek, 'week');
}

export function isAfterNextWeek(date: Date | string): boolean {
    const end = moment().add(1, 'weeks').endOf('week');
    return moment(date).isAfter(end);
}

export function isBeforeThisWeek(date: Date | string): boolean {
    return moment(date).isBefore(moment().startOf('week'));
}

export function isBeforeNextWeek(date: Date | string): boolean {
    const nextWeek = moment().add(1, 'weeks');
    return moment(date).isBefore(nextWeek);
}
