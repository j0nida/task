import React from 'react'
import PropTypes from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import { capitalize } from '../../utils'
import { SelectWrapper, selectStyles } from './SelectWrapper'

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

const AutoSelectControl = ({ error = '', children, ...props }) => {
    const {
        classes,
        onChange,
        name,
        value,
        valueKey = 'id',
        labelKey = 'name',
        label,
        controlClass = 'col',
        fullWidth = true,
        multi = false,
        simpleValue = true,
        options,
        ...otherProps //add this on input tag so that it connects to Form (validify-library) through event such as onChange
    } = props;

    const id = name + Math.random();
    const labelText = label || capitalize(name);

    if (!name)
        return (
            <div className={`${controlClass} border border-warning bg-light text-center`}>
                The propety "name" is required.
            </div>
        );
    //throw new Error(`The propety "name" is required.`);

    const onChangeHandler = newValue => {
        onChange({ target: { name, value: newValue } }); //to propogate/inform the validify Form with the appropriate input event format
    };

    return (
        <div className={controlClass}>
            <FormControl className={classes.formControl} error={error !== ''} fullWidth={fullWidth} margin="dense">
                <InputLabel htmlFor={id}>{labelText}</InputLabel>
                <Input
                    value={value}
                    inputComponent={SelectWrapper}
                    inputProps={{
                        classes,
                        onChange: onChangeHandler,
                        placeholder: '',
                        instanceId: id,
                        id,
                        name,
                        simpleValue,
                        multi,
                        options,
                        valueKey,
                        labelKey,
                        ...otherProps
                    }}
                />
                <FormHelperText>{error}</FormHelperText>
            </FormControl>
        </div>
    );
};

AutoSelectControl.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(selectStyles, styles)(AutoSelectControl);
