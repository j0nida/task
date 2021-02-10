import React from 'react'

const HeaderView = ({ schedulerData }) => {
    const { 
        headers,  
        config, 
        localeMoment 
    } = schedulerData;
    
    let headerHeight = schedulerData.getTableHeaderHeight();
    let cellWidth = schedulerData.getContentCellWidth();

    let headerList = [];
    let style = {};
    headerList = headers.map((item, index) => {
        let datetime = localeMoment(item.time);
        style = !!item.nonWorkingTime ? { width: cellWidth, color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor } : { width: cellWidth };
        if (index === headers.length - 1)
            style = !!item.nonWorkingTime ? { color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor } : {};

        let pFormatList = config.nonAgendaOtherCellHeaderFormat.split('|');
        let pList = pFormatList.map((item, index) => {
            let time = datetime.format(item);
            return (
                <p key={index}>{time}</p>
            );
        });

        return (
            <th key={item.time} className="header3-text" style={style}>
                <div>
                    {pList}
                </div>
            </th>
        );
    });


    return (
        <thead>
            <tr style={{ height: headerHeight }}>
                {headerList}
            </tr>
        </thead>
    );
}

export default HeaderView