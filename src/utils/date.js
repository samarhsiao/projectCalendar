import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const isBetween = require('dayjs/plugin/isBetween');
const duration = require('dayjs/plugin/duration');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
const isToday = require('dayjs/plugin/isToday')
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.extend(duration);
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(isToday)


dayjs.tz.setDefault('Asia/Taipei');

export function tz(
    dateString
) {
    return dayjs.tz(dateString);
}
export function dura(time, unit) {
    return dayjs.duration(time, unit);
}

