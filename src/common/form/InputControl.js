import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { capitalize } from '../utils'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textareaLabel: {
        padding: '5px !important'
    },
    /* textareaControl: {
        borderTop: 'thin solid rgba(0, 0, 0, 0.2)',
        borderRight: 'thin solid rgba(0, 0, 0, 0.2)',
        borderLeft: 'thin solid rgba(0, 0, 0, 0.2)'
    }, */
    '@global': {
        '.textarea-control textarea': {
            padding: '5px !important'
        }
    }
});

const InputControl = ({ error = '', children, ...props }) => {
    const {
        classes,
        name,
        label,
        controlClass = 'col-md',
        fullWidth = true,
        onChange,
        onValueChange,
        ...otherProps //add this on input tag so that it connects to Form (validify-library) through event such as onChange
    } = props;

    let textareaClass = '';
    let textareaLabelClass = '';
    if (otherProps.multiline) {
        textareaClass = classes.textareaControl;
        textareaLabelClass = classes.textareaLabel;
    }

    if (!name)
        return (
            <div className={`${controlClass} border border-warning bg-light text-center`}>
                The propety "name" is required.
            </div>
        );
    //throw new Error(`The propety "name" is required.`);

    const labelText = label === false ? false : label || capitalize(name);

    const onChangeHandler = e => {
        onChange(e);
        onValueChange && onValueChange(e);
    };

    return (
        <div className={controlClass + ' margin-bottom-input textarea-control'}>
            <TextField
                name={name}
                label={labelText}
                InputLabelProps={{ className: textareaLabelClass }}
                error={error !== ''}
                helperText={error}
                margin="dense"
                className={classes.formControl + ' ' + textareaClass}
                fullWidth={fullWidth}
                variant="outlined"
                onChange={onChangeHandler}
                {...otherProps}
            />
        </div>
    );
};

InputControl.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InputControl);
