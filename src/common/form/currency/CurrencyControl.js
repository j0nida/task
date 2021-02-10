import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import { capitalize } from '../../utils'
import CurrencyFormat from './CurrencyFormat'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

const CurrencyControl = ({ error = '', children, ...props }) => {
    const {
        classes,
        name,
        value,
        label,
        controlClass = 'col-md',
        fullWidth = true,
        //format props start
        thousandSeparator = true, //true is equivalet to ","
        decimalSeparator = '.',
        decimalScale = 2,
        fixedDecimalScale = false,
        allowNegative = false,
        prefix,
        suffix,
        format,
        mask,
        onChange,
        onValueChange,
        //format props end
        ...otherProps //add this on input tag so that it connects to Form (validify-library) through event such as onChange
    } = props;

    const onChangeHandler = e => {
        if (onChange) {
            onChange(e);
            onValueChange && onValueChange(e);
        }
    };

    if (!name)
        return (
            <div className={`${controlClass} border border-warning bg-light text-center`}>
                The propety "name" is required.
            </div>
        );
    //throw new Error(`The propety "name" is required.`);

    const id = name + Math.random();
    const labelText = label || capitalize(name);

    return (
        <div className={controlClass}>
            <FormControl className={classes.formControl} error={error !== ''} fullWidth={fullWidth} variant="outlined">
                <InputLabel ref={ref => { this.labelRef = ReactDOM.findDOMNode(ref); }} htmlFor={id}>{labelText}</InputLabel>
                <OutlinedInput
                    value={value}
                    inputProps={{
                        id,
                        name,
                        thousandSeparator,
                        decimalSeparator,
                        decimalScale,
                        fixedDecimalScale,
                        allowNegative,
                        prefix,
                        suffix,
                        format,
                        mask
                    }}
                    onChange={onChangeHandler}
                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    {...otherProps}
                    inputComponent={CurrencyFormat}
                />
                <FormHelperText>{error}</FormHelperText>
            </FormControl>
        </div>
    );
};

CurrencyControl.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CurrencyControl);
