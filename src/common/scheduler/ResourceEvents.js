import React, { Component } from 'react';
import EventItem from './EventItem';

class ResourceEvents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            width: 0
        };
    }

    render() {
        const { resourceEvents, schedulerData } = this.props;
        const { startDate, endDate, config, localeMoment } = schedulerData;
        let cellWidth = schedulerData.getContentCellWidth();
        let cellMaxEvents = 2;
        let rowWidth = schedulerData.getContentTableWidth();

        let eventList = [];
        resourceEvents.headerItems.forEach((headerItem, index) => {
            if (headerItem.count > 0) {
                headerItem.events.forEach((evt, idx) => {
                    if (idx < cellMaxEvents && evt !== undefined && evt.render) {
                        let durationStart = localeMoment(startDate);
                        let durationEnd = localeMoment(endDate).add(1, 'days');
                        let eventStart = localeMoment(evt.eventItem.start);
                        let eventEnd = localeMoment(evt.eventItem.end);
                        let isStart = eventStart >= durationStart;
                        let isEnd = eventEnd <= durationEnd;
                        let left = index * cellWidth + (index > 0 ? 2 : 3);

                        let span = evt.span;
                        if (isStart) {
                            left = left + cellWidth / 2;
                            if (isEnd) span = evt.span - 1;
                        }

                        let width =
                            span * cellWidth - (index > 0 ? 5 : 6) > 0 ? span * cellWidth - (index > 0 ? 5 : 6) : 0;

                        if (!isEnd || !isStart) {
                            width = width - cellWidth / 2 + config.eventItemLineHeight / 2;
                            if (!isStart) left = left - config.eventItemLineHeight / 2;
                        }

                        let eventItem = (
                            <EventItem
                                {...this.props}
                                key={evt.eventItem.id}
                                eventItem={evt.eventItem}
                                isStart={isStart}
                                isEnd={isEnd}
                                left={left}
                                width={width}
                                leftIndex={index}
                                rightIndex={index + span}
                            />
                        );
                        eventList.push(eventItem);
                    }
                });
            }
        });

        return (
            <tr>
                <td style={{ width: rowWidth }}>
                    {
                        <div
                            ref={this.eventContainerRef}
                            className="event-container"
                            style={{ overflow: 'hidden', height: config.eventItemLineHeight - 1 }}
                        >
                            {eventList}
                        </div>
                    }
                </td>
            </tr>
        );
    }

    eventContainerRef = element => {
        this.eventContainer = element;
    };
}

export default ResourceEvents;
