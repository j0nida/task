import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import CurrencyFormat from './CurrencyFormat';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

const CurrencyInput = ({ error = '', children, ...props }) => {
    const {
        classes,
        value,
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
        //format props end
        ...otherProps //add this on input tag so that it connects to Form (validify-library) through event such as onChange
    } = props;

    return (
        <Input
            value={value}
            fullWidth={fullWidth}
            inputProps={{
                name: props.name,
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
            {...otherProps}
            inputComponent={CurrencyFormat}
        />
    );
};

CurrencyInput.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CurrencyInput);
