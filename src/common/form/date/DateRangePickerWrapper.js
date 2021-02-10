import React from 'react';
import moment from 'moment';

//import { DateRangePickerPhrases } from '../src/defaultPhrases';
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION, ANCHOR_LEFT } from 'react-dates/constants';

import { DateRangePicker, DateRangePickerPhrases, isInclusivelyAfterDay } from 'react-dates';
import './styles.css';

const defaultProps = {
    // example props for the demo
    autoFocus: false,
    autoFocusEndDate: false,
    initialStartDate: null,
    initialEndDate: null,

    // input related props
    startDateId: START_DATE,
    startDatePlaceholderText: 'Start Date',
    endDateId: END_DATE,
    endDatePlaceholderText: 'End Date',
    disabled: false,
    required: false,
    screenReaderInputMessage: '',
    showClearDates: false,
    showDefaultInputIcon: false,
    customInputIcon: null,
    customArrowIcon: null,
    customCloseIcon: null,
    block: false,
    small: false,
    regular: false,

    // calendar presentation and interaction related props
    renderMonth: null,
    orientation: HORIZONTAL_ORIENTATION,
    anchorDirection: ANCHOR_LEFT,
    horizontalMargin: 0,
    withPortal: false,
    withFullScreenPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 2,
    keepOpenOnDateSelect: false,
    reopenPickerOnClearDates: false,
    isRTL: false,

    // navigation related props
    navPrev: null,
    navNext: null,
    onPrevMonthClick() {},
    onNextMonthClick() {},
    onClose() {},

    // day presentation and interaction related props
    renderCalendarDay: undefined,
    renderDayContents: null,
    minimumNights: 1,
    enableOutsideDays: false,
    isDayBlocked: () => false,
    isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
    isDayHighlighted: () => false,

    // internationalization
    displayFormat: () => moment.localeData().longDateFormat('L'),
    monthFormat: 'MMMM YYYY',
    phrases: DateRangePickerPhrases,

    stateDateWrapper: date => date
};

class DateRangePickerWrapper extends React.Component {
    constructor(props) {
        super(props);

        let focusedInput = null;
        if (props.autoFocus) {
            focusedInput = START_DATE;
        } else if (props.autoFocusEndDate) {
            focusedInput = END_DATE;
        }

        this.state = {
            focusedInput,
            startDate: props.initialStartDate,
            endDate: props.initialEndDate
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    onDatesChange({ startDate, endDate }) {
        const { stateDateWrapper, onDatesChange } = this.props;

        const dates = {
            startDate: startDate && stateDateWrapper(startDate),
            endDate: endDate && stateDateWrapper(endDate)
        };
        this.setState(dates);
        onDatesChange && onDatesChange(dates);
    }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    render() {
        const { focusedInput, startDate, endDate } = this.state;
        const { dateRange = {} } = this.props;

        const {
            autoFocus,
            autoFocusEndDate,
            initialStartDate,
            initialEndDate,
            stateDateWrapper,
            ...props
        } = this.props;

        return (
            <div>
                <DateRangePicker
                    {...props}
                    block
                    onDatesChange={this.onDatesChange}
                    onFocusChange={this.onFocusChange}
                    focusedInput={focusedInput}
                    startDate={dateRange.startDate || startDate}
                    endDate={dateRange.endDate || endDate}
                />
            </div>
        );
    }
}

//DateRangePickerWrapper.propTypes = propTypes;
DateRangePickerWrapper.defaultProps = defaultProps;

export default DateRangePickerWrapper;
