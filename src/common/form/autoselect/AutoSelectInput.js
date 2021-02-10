import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { SelectWrapper, selectStyles } from './SelectWrapper';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 200,
        width: 200
    },
    chip: {
        margin: theme.spacing.unit / 4
    }
});

const AutoSelectInput = ({ children, ...props }) => {
    const {
        classes,
        className = 'inRowInput',
        onChange,
        onValueChange,
        defaultValue,
        valueKey = 'id',
        labelKey = 'name',
        fullWidth = true,
        multi = false,
        simpleValue = true,
        options,
        ...otherProps //add this on input tag so that it connects to Form (validify-library) through event such as onChange
    } = props;

    const onChangeHandler = newValue => {
        onChange({ target: { name: props.name, value: newValue } }); //to propogate/inform the validify Form with the appropriate input event format
        onValueChange && onValueChange(newValue);
    };
    return (
        <Input
            className={className}
            defaultValue={defaultValue}
            fullWidth={fullWidth}
            inputComponent={SelectWrapper}
            inputProps={{
                classes,
                onChange: onChangeHandler,
                placeholder: '',
                simpleValue,
                multi,
                options,
                valueKey,
                labelKey,
                ...otherProps
            }}
        />
    );
};

AutoSelectInput.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(selectStyles, styles)(AutoSelectInput);
