import React from 'react';
import NumberFormat from 'react-number-format';

const CurrencyFormat = props => {
    const { inputRef, onChange, ...otherProps } = props;
    return (
        <NumberFormat
            {...otherProps}
            ref={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value
                    }
                });
            }}
        />
    );
};

export default CurrencyFormat;
