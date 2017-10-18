// @flow
import moment from 'moment';
import _ from 'lodash';

const DATES = {
    startOfThisWeek: moment().startOf('week').valueOf(),
    endOfThisWeek: moment().endOf('week').valueOf(),
    startOfNextWeek: moment().add(1, 'weeks').startOf('week').valueOf(),
    endOfNextWeek: moment().add(1, 'weeks').endOf('week').valueOf(),
};

function updateCaches() {
    DATES.startOfThisWeek = moment().startOf('week').valueOf();
    DATES.endOfThisWeek = moment().endOf('week').valueOf();
    DATES.startOfNextWeek = moment().add(1, 'weeks').startOf('week').valueOf();
    DATES.endOfNextWeek = moment().add(1, 'weeks').endOf('week').valueOf();
}

const updateCachesThrottle = _.throttle(updateCaches, 1000);

function isThisWeek(date: Date | string): boolean {
    const time = new Date(date).getTime();
    return time > DATES.startOfThisWeek && time < DATES.endOfThisWeek;
}

function isNextWeek(date: Date | string): boolean {
    const time = new Date(date).getTime();
    return time > DATES.startOfNextWeek && time < DATES.endOfNextWeek;
}

function isAfterNextWeek(date: Date | string): boolean {
    return new Date(date).getTime() > DATES.endOfNextWeek;
}

function isBeforeThisWeek(date: Date | string): boolean {
    return new Date(date).getTime() < DATES.startOfThisWeek;
}

function isBeforeNextWeek(date: Date | string): boolean {
    return new Date(date).getTime() < DATES.startOfNextWeek;
}

const dates = {
    get isThisWeek() {
        updateCachesThrottle();
        return isThisWeek;
    },
    get isNextWeek() {
        updateCachesThrottle();
        return isNextWeek;
    },
    get isAfterNextWeek() {
        updateCachesThrottle();
        return isAfterNextWeek;
    },
    get isBeforeThisWeek() {
        updateCachesThrottle();
        return isBeforeThisWeek;
    },
    get isBeforeNextWeek() {
        updateCachesThrottle();
        return isBeforeNextWeek;
    },
};

module.exports = dates;
