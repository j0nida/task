import React from 'react'
//import { SelectControl } from '../form'

export { default as EditableTable } from './EditableTable';
export { default as TableComponent } from './TableComponent';

export const SelectFilter = (props) => {
    const {
        filter,
        onChange,
        options = [], 
        includeAllOptions = true,
        allOptionLabel = "All",
        allOptionValue = '_all_',
        valueKey = 'name',//SINCE TABLE FILTERS BY THE DISPLAYED VALUE, ALSO 'id' CAN BE USED
        labelKey = 'name',
    } = props;

    const renderOptions = () => {
        return options.map((option) => (
            <option key={option[valueKey]} value={option[valueKey]}>{option[labelKey]}</option>
        ));
    }

    return (
        <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : allOptionValue}>
            {includeAllOptions && <option key={allOptionValue} value={allOptionValue}>{allOptionLabel}</option>}
            {renderOptions()}
        </select>
    )
}

export const SelectFilterColumn = ({ selectFilterConfig, ...columnProps }) => {
    const {
        includeAllOptions = true,
        allOptionValue = '_all_'
    } = selectFilterConfig;

    return {
        filterMethod: (filter, row) => {
            if (includeAllOptions && filter.value === allOptionValue) {
                return true;
            }

            // eslint-disable-next-line
            return (row[filter.id] == filter.value);
        },
        Filter: (params) => SelectFilter({ ...params, ...selectFilterConfig}),
        ...columnProps
    }
}
