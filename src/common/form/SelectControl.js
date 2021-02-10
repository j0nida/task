import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select'
import { capitalize } from '../utils'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

const SelectControl = ({ error = '', children, ...props }) => {
    const {
        classes,
        name,
        value,
        options,
        emptyOption,
        valueKey = 'id',
        labelKey = 'name',
        label,
        controlClass = 'col-md',
        fullWidth = true,
        onChange,
        onSelect,
        ...otherProps //add this on input tag so that it connects to Form (validify-library) through event such as onChange
    } = props;

    if (!name)
        return (
            <div className={`${controlClass} border border-warning bg-light text-center`}>
                The propety "name" is required.
            </div>
        );

    const id = name + Math.random();
    const labelText = label || capitalize(name);

    const getChildren = () => {
        if (children) {
            return children;
        } else if (options) {
            let optionsList = [...options];
            if (emptyOption) {
                let emptyOptionLabel = emptyOption === true ? <em>Select an option</em> : emptyOption;

                optionsList.unshift({ [valueKey]: '', [labelKey]: emptyOptionLabel });
            }

            return optionsList.map(option => (
                <MenuItem key={option[valueKey]} value={option[valueKey]}>
                    {option[labelKey]}
                </MenuItem>
            ));
        } else {
            return <option>Warning: No options are set</option>;
        }
    };

    const onChangeHandler = e => {
        if (onChange) onChange(e); //to propogate/inform the validify Form
        if (onSelect) {
            let selected = options.filter(option => option[valueKey] === e.target.value);
            selected = selected[0] || { [labelKey]: '', doc: null };
            
            e.target.label = selected[labelKey];
            onSelect(e.target, selected.doc);
        }
    };

    return (
        <div className={controlClass + ' margin-bottom-input'}>
            <FormControl className={classes.formControl} error={error !== ''} fullWidth={fullWidth} variant="outlined" margin="dense">
                <InputLabel ref={ref => { this.labelRef = ReactDOM.findDOMNode(ref); }} htmlFor={id}>{labelText}</InputLabel>
                <Select value={value} inputProps={{ id, name }} onChange={onChangeHandler} {...otherProps}
                input={
                <OutlinedInput
                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    name={name}
                    id={id}
                    /> } 
                    >
                    {getChildren()}
                </Select>
                <FormHelperText>{error}</FormHelperText>
            </FormControl>
        </div>
    );
};

SelectControl.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectControl);
