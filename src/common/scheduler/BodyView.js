import React from 'react'

const BodyView = ({ schedulerData }) => {

    const {
        renderData,
        headers,
        config
    } = schedulerData;

    let cellWidth = schedulerData.getContentCellWidth();

    let tableRows = renderData.map((item) => {
        let rowCells = headers.map((header, index) => {
            let key = item.slotId + '_' + header.time;
            let style = index === headers.length - 1 ? {} : { width: cellWidth };
            if (!!header.nonWorkingTime)
                style = { ...style, backgroundColor: config.nonWorkingTimeBodyBgColor };
            return (
                <td key={key} style={style}><div></div></td>
            )
        });

        return (
            <tr key={item.slotId} style={{ height: config.eventItemLineHeight }}>
                {rowCells}
            </tr>
        );
    });

    return (
        <tbody>
            {tableRows}
        </tbody>
    );
}

export default BodyView