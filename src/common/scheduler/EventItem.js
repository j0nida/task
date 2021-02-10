import React from 'react'

const EventItem = (props) => {

    const {
        eventItem,
        //isStart,
        //isEnd,
        eventItemClick,
        schedulerData,
        left,
        width,
    } = props;

    const { config } = schedulerData;

    let bgColor = config.defaultEventBgColor;
    if (eventItem.bgColor !== undefined)
        bgColor = eventItem.bgColor;

    let titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, eventItem);

    return <div>
        <a className="timeline-event" style={{ left: left, width: width }} 
            onClick={() => { if (!!eventItemClick) eventItemClick(schedulerData, eventItem); }}>
            <div style={{ position: 'relative', height: config.eventItemHeight }}>
                <div className="event-item" key={eventItem.id}
                    style={{height: config.eventItemHeight, backgroundColor: bgColor }}>
                </div>
                <span className="event-item-label">{titleText}</span>
            </div>
        </a>
    </div>
}

export default EventItem