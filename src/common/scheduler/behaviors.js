//getDateLabelFuncExample
export const getDateLabel = (schedulerData, startDate, endDate) => {
    let start = schedulerData.localeMoment(startDate);
    let end = schedulerData.localeMoment(endDate);
    let dateLabel = start.format('MMM D, YYYY');

    dateLabel = `${start.format('MMM D')}-${end.format('D, YYYY')}`;
    if(start.month() !== end.month())
        dateLabel = `${start.format('MMM D')}-${end.format('MMM D, YYYY')}`;
    if(start.year() !== end.year())
        dateLabel = `${start.format('MMM D, YYYY')}-${end.format('MMM D, YYYY')}`;

    return dateLabel;
}

export const getEventText = (schedulerData, event) => {
    return event.title;
}

export const isNonWorkingTime = (schedulerData, time) => {
    const { localeMoment } = schedulerData;
    let dayOfWeek = localeMoment(time).weekday();
    if (dayOfWeek === 5 || dayOfWeek === 6)
        return true;

    return false;
}

export default {
    getDateLabelFunc: getDateLabel,
    getEventTextFunc: getEventText,
    isNonWorkingTimeFunc: isNonWorkingTime,
}
