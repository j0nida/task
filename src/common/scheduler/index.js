import React, { Component } from 'react'
import ResourceView from './ResourceView'
import HeaderView from './HeaderView'
import BodyView from './BodyView'
import ResourceEvents from './ResourceEvents'
import SchedulerData from './SchedulerData'
import DemoData from './DemoData'
import { getPos } from './Util'

class Scheduler extends Component {

    constructor(props) {
        super(props);

        this.currentArea = -1;
        this.prevLoadScrolling = false;
        this.startX = -1;
        this.startY = -1;
        this.scrollDragging = false;

        this.state = {
            visible: false,
            browserScrollbarHeight: 17,
            browserScrollbarWidth: 17,
        };
    }

    componentDidMount(props, state){
        this.resolveScrollbarSize();
        this.schedulerContent.scrollLeft = 300;
        document.documentElement.addEventListener('mouseup', this.onSchedulerContentMouseUp, false);
    }

    componentWillUnmount(props, state) {
        document.documentElement.removeEventListener('mouseup', this.onSchedulerContentMouseUp, false);
    }

    componentDidUpdate(props, state) {
        this.resolveScrollbarSize();

        if (this.prevLoadScrolling === true)
        {
            this.schedulerContent.scrollLeft = 700 - this.schedulerContent.scrollLeft;
            this.prevLoadScrolling = false;
            
            this.onSchedulerContentScroll();
        }

        /*
        const { schedulerData } = this.props;
        const { localeMoment} = schedulerData;
        if(schedulerData.getScrollToToday()){
            if(!!this.schedulerContent && this.schedulerContent.scrollWidth > this.schedulerContent.clientWidth){
                let start = localeMoment(schedulerData.startDate).startOf('day'),
                    end = localeMoment(schedulerData.endDate).endOf('day'),
                    now = localeMoment();
                if(now>= start && now <= end){
                    let index = 0;
                    schedulerData.headers.forEach((item) => {
                        let header = localeMoment(item.time);
                        if(now >= header)
                            index ++;
                    })
                    this.schedulerContent.scrollLeft = (index - 1) * schedulerData.getContentCellWidth();

                    schedulerData.setScrollToToday(false);
                }
            }
        }*/
    }

    resolveScrollbarSize = () => {
        let browserScrollbarHeight = 17, browserScrollbarWidth = 17;
        if (!!this.schedulerContent) {
            browserScrollbarHeight = this.schedulerContent.offsetHeight - this.schedulerContent.clientHeight;
            browserScrollbarWidth = this.schedulerContent.offsetWidth - this.schedulerContent.clientWidth;
        }

        let tmpState = {};
        let needSet = false;
        if (browserScrollbarHeight !== this.state.browserScrollbarHeight) {
            tmpState = {...tmpState, browserScrollbarHeight: browserScrollbarHeight};
            needSet = true;
        }
        if (browserScrollbarWidth !== this.state.browserScrollbarWidth) {
            tmpState = {...tmpState, browserScrollbarWidth: browserScrollbarWidth};
            needSet = true;
        }
        if (needSet)
            this.setState(tmpState);
    }

    schedulerHeadRef = (element) => {
        this.schedulerHead = element;
    }

    onSchedulerHeadMouseOver = () => {
        this.currentArea = 2;
    }

    onSchedulerHeadMouseOut = () => {
        this.currentArea = -1;
    }

    onSchedulerHeadScroll = (proxy, event) => {
         if((this.currentArea === 2 || this.currentArea === -1) && this.schedulerContent.scrollLeft !== this.schedulerHead.scrollLeft)
             this.schedulerContent.scrollLeft = this.schedulerHead.scrollLeft;
    }

    schedulerResourceRef = (element) => {
        this.schedulerResource = element;
    }

    onSchedulerResourceMouseOver = () => {
        this.currentArea = 1;
    }

    onSchedulerResourceMouseOut = () => {
        this.currentArea = -1;
    }

    //DRAG-DROP START >>>>>>>>>>>>>>>>>>>>>
    onSchedulerContentMouseDown = (ev) => {
        ev.stopPropagation();
        let pos = getPos(this.schedulerContent);
        this.startX = ev.clientX - pos.x;
        this.startY = ev.clientY - pos.y;
        this.scrollDragging = true;
    }

    //DRAG-DROP MOVE
    onSchedulerContentMouseMove = (ev) => {
        ev.stopPropagation();
        if (this.scrollDragging)
        {
            let pos = getPos(this.schedulerContent);
            let currentX = ev.clientX - pos.x;
            let currentY = ev.clientY - pos.y;
            this.schedulerContent.scrollTo(
                this.schedulerContent.scrollLeft + (this.startX - currentX), 
                this.schedulerContent.scrollTop + (this.startY - currentY)
            );
        }
    }

    //DRAG-DROP STOP <<<<<<<<<<<<<<<<<<<<
    onSchedulerContentMouseUp = (ev) => {
        this.scrollDragging = false;
        ev.stopPropagation();
    }

    onSchedulerResourceScroll = (proxy, event) => {
         if((this.currentArea === 1 || this.currentArea === -1) && this.schedulerContent.scrollTop !== this.schedulerResource.scrollTop)
             this.schedulerContent.scrollTop = this.schedulerResource.scrollTop;
    }

    schedulerContentRef = (element) => {
        this.schedulerContent = element;
    }

    onSchedulerContentMouseOver = () => {
        this.currentArea = 0;
    }

    onSchedulerContentMouseOut = () => {
        this.currentArea = -1;
    }

    onSchedulerContentScroll = () => {
        if(this.currentArea === 0 || this.currentArea === -1) {
            if (this.schedulerHead.scrollLeft !== this.schedulerContent.scrollLeft)
                this.schedulerHead.scrollLeft = this.schedulerContent.scrollLeft;
            if (this.schedulerResource.scrollTop !== this.schedulerContent.scrollTop)
                this.schedulerResource.scrollTop = this.schedulerContent.scrollTop;

            if (this.schedulerContent.scrollLeft > (this.schedulerContent.scrollWidth - this.schedulerContent.offsetWidth - 200))//2days
            {
                this.goNext();
            }

            if (this.prevLoadScrolling === false && this.schedulerContent.scrollLeft < 50) //half day
            {
                //stop/reset drag-scrolling because it loads to quickly while draging left (right is ok)
                this.scrollDragging = false;
                this.prevLoadScrolling = true;
                this.goBack();
            }
        }
    }

    goNext = () => {
        const {nextClick, schedulerData} = this.props;
        nextClick(schedulerData);
    }

    goBack = () => {
        const {prevClick, schedulerData} = this.props;
        prevClick(schedulerData);
    }

    handleVisibleChange = (visible) => {
        this.setState({visible});
    }

    onSelect = (date) => {
        this.setState({
            visible: false,
        });

        const {onSelectDate, schedulerData} = this.props;
        onSelectDate(schedulerData, date);
    }

    render() {
        const { schedulerData } = this.props;
        const { renderData, config } = schedulerData;
        const width = config.schedulerWidth;

        //let dateLabel = schedulerData.getDateLabel();

        let resourceTableWidth = schedulerData.getResourceTableWidth();
        let schedulerContainerWidth = width - resourceTableWidth + 1;
        let schedulerWidth = schedulerData.getContentTableWidth() - 1;

        let resourceEventsList = renderData.map((item) => {
            return <ResourceEvents
                {...this.props}
                key={item.slotId}
                resourceEvents={item} />
        });

        let browserScrollbarHeight = this.state.browserScrollbarHeight, browserScrollbarWidth = this.state.browserScrollbarWidth;
        let resourceContentStyle = { overflow: "auto", margin: `0px -${browserScrollbarWidth}px 0px 0px` };
        let schedulerContentStyle = { overflowX: "hidden", overflowY: "auto", margin: "-1px, 0px, 0px, 0px", position: "relative" };
        if (config.schedulerMaxHeight > 0) {
            resourceContentStyle = {
                ...resourceContentStyle,
                maxHeight: config.schedulerMaxHeight - config.tableHeaderHeight
            };
            schedulerContentStyle = {
                ...schedulerContentStyle,
                maxHeight: config.schedulerMaxHeight - config.tableHeaderHeight
            };
        }

        let resourceName = config.resourceName;
        return (
            <table className="scheduler" style={{ width: width }}>
                <tbody>
            <tr>
                <td style={{ width: resourceTableWidth, verticalAlign: 'top' }}>
                    <div className="resource-view">
                        <div style={{ overflow: "hidden", height: config.tableHeaderHeight }}>
                            <div style={{ overflowX: "scroll", overflowY: "hidden", margin: `0px 0px -${browserScrollbarHeight}px` }}>
                                <table className="resource-table">
                                    <thead>
                                        <tr style={{ height: config.tableHeaderHeight }}>
                                            <th className="header3-text">
                                                {resourceName}
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div style={resourceContentStyle}
                            ref={this.schedulerResourceRef}
                            onMouseOver={this.onSchedulerResourceMouseOver}
                            onMouseOut={this.onSchedulerResourceMouseOut}
                            onScroll={this.onSchedulerResourceScroll}>
                            <ResourceView
                                {...this.props}
                                config={config}
                                browserScrollbarHeight={browserScrollbarHeight}
                            />
                        </div>
                    </div>
                </td>
                <td>
                    <div className="scheduler-view" style={{ width: schedulerContainerWidth, verticalAlign: 'top' }}>
                        <div style={{ overflow: "hidden", borderBottom: "1px solid #cccccc", height: config.tableHeaderHeight }}>
                            <div style={{ overflowX: "scroll", overflowY: "hidden", margin: `0px 0px -${browserScrollbarHeight}px` }}
                                ref={this.schedulerHeadRef}
                                onMouseOver={this.onSchedulerHeadMouseOver}
                                onMouseOut={this.onSchedulerHeadMouseOut}
                                onScroll={this.onSchedulerHeadScroll}>
                                <div style={{ paddingRight: `${browserScrollbarWidth}px`, width: schedulerWidth + browserScrollbarWidth }}>
                                    <table className="scheduler-bg-table">
                                        <HeaderView {...this.props} />
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div style={schedulerContentStyle}
                            ref={this.schedulerContentRef}
                            onMouseOver={this.onSchedulerContentMouseOver}
                            onMouseOut={this.onSchedulerContentMouseOut}
                            onMouseDown={this.onSchedulerContentMouseDown}
                            onMouseMove={this.onSchedulerContentMouseMove}
                            onScroll={this.onSchedulerContentScroll} >
                            <div style={{ width: schedulerWidth }}>
                                <div className="scheduler-content">
                                    <table className="scheduler-content-table" >
                                        <tbody>
                                            {resourceEventsList}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="scheduler-bg">
                                    <table className="scheduler-bg-table" style={{ width: schedulerWidth }}>
                                        <BodyView {...this.props} />
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>

                </tbody>
            </table>
        );
    }
}

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export {SchedulerData, DemoData}
export default Scheduler