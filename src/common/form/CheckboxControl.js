import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Switch from '@material-ui/core/Switch'
import { capitalize } from '../utils'

const styles = {};

const CheckboxControl = ({ error, ...props }) => {
    const {
        classes,
        name,
        value,
        label,
        type = 'switch',
        controlClass = 'col',
        onChange,
        onValueChange,
        ...otherProps //add this on input tag so that it connects to Form (validify-library) through event such as onChange
    } = props;

    if (!name)
        return (
            <div className={`${controlClass} border border-warning bg-light text-center`}>
                The propety "name" is required.
            </div>
        );

    const labelText = label || capitalize(name);

    const onChangeHandler = e => {
        if (onChange) {
            //THIS IS A BUG-FIX FOR THE "validify" Form WHICH DOESN'T NOTICE THE CHECKBOX TYPE IF THE VALUE PROPERTY IS SET
            e.target.value = e.target.checked ? 1 : 0; //OR TO SET IT TO "null" AND THEN IT NOTICES/CHECKS IF IT IS A CHECKBOX
            onChange(e); //to propogate/inform the validify Form
            onValueChange && onValueChange(e);
        }
    };

    const getControl = type => {
        if (type === 'checkbox')
            return (
                <Checkbox
                    name={name}
                    value={value}
                    checked={value === 1 || value === '1' || value === true}
                    onChange={onChangeHandler}
                    {...otherProps}
                />
            );
        else
            return (
                <Switch
                    name={name}
                    value={value}
                    checked={value === 1 || value === '1' || value === true}
                    onChange={onChangeHandler}
                    {...otherProps}
                />
            );
    };

    return (
        <div className={controlClass}>
            <FormControlLabel label={labelText} control={getControl(type)} />
        </div>
    );
};

CheckboxControl.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckboxControl);
