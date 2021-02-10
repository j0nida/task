import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import { capitalize } from '../utils'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});


const RadioGroupControl = ({ error, children, ...props }) => {

  const {
    classes,
    name, 
    value,
    options,
    valueKey='id',
    labelKey='name',
    label, 
    radioButtonClass,
    controlClass = 'col-md-6',
    fullWidth = true,
    ...otherProps //add this on input tag so that it connects to Form (validify-library) through event such as onChange
  } = props;
  
  if (!name)
    return <div className={`${controlClass} border border-warning bg-light text-center`}>The propety "name" is required.</div>

  const labelText = label || capitalize(name);


  const getChildren = () => {
    if (children) {
      return children;
    }
    else if (options) {
      return options.map((radio) => (
        <FormControlLabel key={radio[valueKey]} label={radio[labelKey]} className={radioButtonClass} control={
          <Radio name={name} value={radio[valueKey]} checked={radio[valueKey] === value} aria-label={radio[labelKey]} {...otherProps} />
        } />
      ));
    }
    else 
    {
      return <div>Warning: No options are set</div>
    }
  }
  
  return (
    <div className={controlClass}>
      <FormControl component="fieldset" className={classes.formControl} error={error !== ""} fullWidth={fullWidth}>
        <FormLabel component="legend">{labelText}</FormLabel>
        <div>
          {getChildren()}
          </div>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    </div>
  )
};

RadioGroupControl.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioGroupControl);