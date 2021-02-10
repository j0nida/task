import moment from 'moment'
//import 'moment/locale/zh-cn'
import config from './config'
import behaviors from './behaviors'
import {DATE_FORMAT, DATETIME_FORMAT} from './index'

export default class SchedulerData {
    constructor(date=moment().format(DATE_FORMAT),
                newConfig = undefined, newBehaviors = undefined,
                localeMoment = undefined) {
        this.resources = [];
        this.events = [];
        this.resizing = false;
        this.scrollToToday = false;

        this.config = newConfig === undefined ? config : {...config, ...newConfig};
        this.behaviors = newBehaviors === undefined ? behaviors : { ...behaviors, ...newBehaviors };

        this.localeMoment = moment;
        if(!!localeMoment)
            this.localeMoment = localeMoment;

        this.setDate(date);
    }

    setLocaleMoment(localeMoment){
        if(!!localeMoment){
            this.localeMoment = localeMoment;
            this._createHeaders();
            this._createRenderData();
        }
    }

    setResources(resources) {
        this._validateResource(resources);
        this.resources = Array.from(new Set(resources));
        this._createRenderData();
        this.setScrollToToday(true);
    }

    addResource(resource){
        let existedResources = this.resources.filter(x => x.id === resource.id);
        if(existedResources.length === 0){
            this.resources.push(resource);
            this._createRenderData();
        }
    }

    setEvents(events) {
        this._validateEvents(events);
        this.events = events;
        this._createRenderData();
        this.setScrollToToday(true);
    }

    setScrollToToday(scrollToToday){
        if(this.config.scrollToTodayEnabled)
            this.scrollToToday = scrollToToday;
    }

    getScrollToToday(){
        if(this.config.scrollToTodayEnabled)
            return this.scrollToToday;
        return false;
    }

    prev(count = -7) {
        this.startDate = this.localeMoment(this.startDate).add(count, 'days').format(DATE_FORMAT);

        this.events = [];
        this._createHeaders();
        this._createRenderData();
    }

    next(count = 7) {
        this.endDate = this.localeMoment(this.endDate).add(count, 'days').format(DATE_FORMAT);

        this.events = [];
        this._createHeaders();
        this._createRenderData();
    }

    setDate(date=moment().format(DATE_FORMAT)){

        this.startDate = this.localeMoment(date).add(-3, 'days').format(DATE_FORMAT);
        this.endDate = this.localeMoment(this.startDate).add(3, 'weeks').format(DATE_FORMAT);

        this.events = [];
        this._createHeaders();
        this._createRenderData();
    }

    setDimensions(width, height){
        this.config.schedulerWidth = width;
        this.config.schedulerMaxHeight = height;
    }

    setSchedulerMaxHeight(newSchedulerMaxHeight){
        this.config.schedulerMaxHeight = newSchedulerMaxHeight;
    }

    getSlots(){
        return this.resources;
    }

    getSlotById(slotId){
        let slots = this.getSlots();
        let slot = undefined;
        slots.forEach((item) => {
            if(item.id === slotId)
                slot = item;
        })
        return slot;
    }

    getResourceById(resourceId){
        let resource = undefined;
        this.resources.forEach((item) => {
            if(item.id === resourceId)
                resource = item;
        })
        return resource;
    }

    getTableHeaderHeight() {
        return this.config.tableHeaderHeight;
    }

    getResourceTableWidth() {
        return this.config.weekResourceTableWidth;
    }

    getContentCellWidth(){
        return this.config.weekCellWidth;
    }

    getCellMaxEvents(){
        return 1
    }

    getContentTableWidth(){
        return this.headers.length * (this.getContentCellWidth());
    }

    getDateLabel(){
        let start = this.localeMoment(this.startDate);
        //let end = this.localeMoment(this.endDate);
        let dateLabel = start.format('LL');

        if(!!this.behaviors.getDateLabelFunc)
            dateLabel = this.behaviors.getDateLabelFunc(this, this.startDate, this.endDate);

        return dateLabel;
    }

    addEvent(newEvent){
        this._attachEvent(newEvent);
        this._createRenderData();
    }

    updateEventStart(event, newStart) {
        this._detachEvent(event);
        event.start = newStart;
        this._attachEvent(event);
        this._createRenderData();
    }

    updateEventEnd(event, newEnd) {
        event.end = newEnd;
        this._createRenderData();
    }

    moveEvent(event, newSlotId, newSlotName, newStart, newEnd){
        this._detachEvent(event);
        event.resourceId = newSlotId;
        event.end = newEnd;
        event.start = newStart;
        this._attachEvent(event);
        this._createRenderData();
    }

    _detachEvent(event) {
        let index = this.events.indexOf(event);
        if(index !== -1)
            this.events.splice(index, 1);
    }

    _attachEvent(event) {
        let pos = 0;
        let eventStart = this.localeMoment(event.start);
        this.events.forEach((item, index) => {
            let start = this.localeMoment(item.start);
            if(eventStart >= start)
                pos = index + 1;
        });
        this.events.splice(pos, 0, event);
    }

    _createHeaders() {
        let headers = [],
            start = this.localeMoment(this.startDate),
            end = this.localeMoment(this.endDate),
            header = start;

        while (header >= start && header <= end) {
            let time = header.format(DATETIME_FORMAT);
            let nonWorkingTime = this.behaviors.isNonWorkingTimeFunc(this, time);
            headers.push({ time: time, nonWorkingTime: nonWorkingTime });

            header = header.add(1, 'days');
        }
    
        this.headers = headers;
    }

    _createInitHeaderEvents(header) {
        let start = this.localeMoment(header.time),
            startValue = start.format(DATETIME_FORMAT);
        let endValue = start.add(1, 'days').format(DATETIME_FORMAT);
        return {
            time:  header.time,
            nonWorkingTime: header.nonWorkingTime,
            start: startValue,
            end:   endValue,
            count: 0,
            events: [],
        };
    }

    _createHeaderEvent(render, span, eventItem) {
        return {
            render: render,
            span: span,
            eventItem: eventItem
        };
    }

    _getEventSlotId(event){
        return event.resourceId;
    }

    _createInitRenderData(resources, headers) {
        return resources.map((resource) => {
            let headerEvents = headers.map((header) => {
                return this._createInitHeaderEvents(header);
            });

            return {
                slotId: resource.id,
                slotName: resource.name,
                headerItems: headerEvents
            };
        });
    }

    _getSpan(startTime, endTime, startDate, endDate){
        let start = this.localeMoment(startTime).startOf('day'),
            end = this.localeMoment(endTime),
            spanStart = this.localeMoment(startDate),
            spanEnd = this.localeMoment(endDate),
            time = start,
            span = 0;

        while(time >= start && time < end) {
            if(time >= spanStart && time <= spanEnd) {
                span++;
            }

            time = time.add(1, 'days');
        }

        return span;
    }

    _validateResource(resources){
        if(Object.prototype.toString.call(resources) !== "[object Array]") {
            throw new Error('Resources should be Array object');
        }

        resources.forEach((item, index) => {
            if(item === undefined) {
                console.error(`Resource undefined: ${index}`);
                throw new Error(`Resource undefined: ${index}`);
            }
            if(item.id === undefined || item.name === undefined)
            {
                console.error('Resource property missed', index, item);
                throw new Error(`Resource property undefined: ${index}`);
            }
        });
    }


    _validateEvents(events){
        if(Object.prototype.toString.call(events) !== "[object Array]") {
            throw new Error('Events should be Array object');
        }

        events.forEach((e, index) => {
            if(e === undefined) {
                console.error(`Event undefined: ${index}`);
                throw new Error(`Event undefined: ${index}`);
            }
            if(e.id === undefined || e.resourceId === undefined || e.title === undefined || e.start === undefined || e.end === undefined)
            {
                console.error('Event property missed', index, e);
                throw new Error(`Event property undefined: ${index}`);
            }
        });
    }

    _compare(event1, event2){
        let start1 = this.localeMoment(event1.start), start2 = this.localeMoment(event2.start);
        if(start1 !== start2) return start1 < start2 ? -1 : 1;

        let end1 = this.localeMoment(event1.end), end2 = this.localeMoment(event2.end);
        if(end1 !== end2) return end1 < end2 ? -1 : 1;

        return event1.id < event2.id ? -1 : 1;
    }

    _createRenderData() {
        let initRenderData = this._createInitRenderData(this.resources, this.headers);
        //this.events.sort(this._compare);

        this.events.forEach((item) => {
            let resourceEventsList = initRenderData.filter(x => x.slotId === this._getEventSlotId(item));
            if(resourceEventsList.length > 0) {
                let resourceEvents = resourceEventsList[0];
                let span = this._getSpan(item.start, item.end, this.headers[0].time, this.headers[this.headers.length - 1].time);
                let eventStart = this.localeMoment(item.start), eventEnd = this.localeMoment(item.end);
                let pos = -1;

                resourceEvents.headerItems.forEach((header, index) => {
                    let headerStart = this.localeMoment(header.start), headerEnd = this.localeMoment(header.end);
                    if(headerEnd > eventStart && headerStart < eventEnd) {
                        header.count = header.count + 1;

                        if(pos === -1)
                        {
                            let tmp = 0;
                            while (header.events[tmp] !== undefined)
                                tmp++;

                            pos = tmp;
                        }
                        let render = headerStart <= eventStart || index === 0;
                        header.events[pos] = this._createHeaderEvent(render, span, item);
                    }
                });
            }
        });
        this.renderData = initRenderData;
    }

}


