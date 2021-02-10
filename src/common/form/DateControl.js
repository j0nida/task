import React from 'react';
import { InlineDatePicker } from 'material-ui-pickers';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { capitalize } from '../utils'


const DateControl = ({ error = '', children, ...props }) => {

    const {
        classes,
        name,
        label,
        value,
        onChange,
        onValueChange,
        ...otherProps //add this on input tag so that it connects to Form (validify-library) through event such as onChange
    } = props;

    const labelText = label === false ? false : label || capitalize(name);

    const onChangeHandler = e => {
        onChange(e);
        onValueChange && onValueChange(e);
    };

    return (
        <div className="picker">
          <InlineDatePicker
            keyboard
            name={name}
            label={labelText}
            variant="outlined"
            value={value}
            onChange={onChangeHandler}
            format="dd/MM/yyyy"
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            {...otherProps}
          />
        </div>
    );
  };

DateControl.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles()(DateControl);