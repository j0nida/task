import React from 'react'

const ResourceView = (props) => {

    const {
        schedulerData,
        browserScrollbarHeight,
        resourceClickedFunc,
        config 
    } = props;

    const { renderData } = schedulerData;

    let width = schedulerData.getResourceTableWidth() - 2;
    let paddingBottom = browserScrollbarHeight;
    let resourceList = renderData.map((item) => {
        let a = resourceClickedFunc !== undefined ? <a onClick={() => {
            resourceClickedFunc(schedulerData, item);
        }}>{item.slotName}</a>
            : <span>{item.slotName}</span>;
        return (
            <tr key={item.slotId} style={{ height: config.eventItemLineHeight }}>
                <td data-resource-id={item.slotId} className="header2-text">
                    <div style={{ width: width }} title={item.slotName} className="overflow-text">
                        {a}
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <div style={{ paddingBottom: paddingBottom }}>
            <table className="resource-table">
                <tbody>
                    {resourceList}
                </tbody>
            </table>
        </div>
    )

}

export default ResourceView