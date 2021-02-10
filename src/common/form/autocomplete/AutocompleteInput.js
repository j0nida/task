import React from 'react';
import PropTypes from 'prop-types';
//import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { MenuItem } from '@material-ui/core/Menu';
import Chip from '@material-ui/core/Chip';

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            {...other}
            inputRef={ref}
            InputProps={{
                classes: {
                    input: classes.input,
                },
                ...InputProps,
            }}
        />
    );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.name}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.name}
        </MenuItem>
    );
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ name: PropTypes.string }).isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    chip: {
        margin: `${theme.spacing.unit}px ${theme.spacing.unit / 4}px`,
    },
});

const AutocompleteInput = ({ children, ...props }) => {

    const {
        classes,
        className = "inRowInput",
        onChange,
        defaultValue,
        valueKey = 'id',
        labelKey = 'name',
        fullWidth = true,
        options,
        ...otherProps //add this on input tag so that it connects to Form (validify-library) through event such as onChange
    } = props;

    const onChangeHandler = (newValue) => {
        onChange({ target: { name: props.name, value: newValue } });//to propogate/inform the validify Form with the appropriate input event format
    }

    function getSuggestions(inputValue) {
        let count = 0;

        return options.filter(suggestion => {
            const keep =
                (!inputValue || suggestion.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
                count < 5;

            if (keep) {
                count += 1;
            }

            return keep;
        });
    }


    return (
        <div className={className}>
            <Downshift>
                {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
                    <div className={classes.container}>
                        {renderInput({
                            defaultValue,
                            fullWidth,
                            classes,
                            InputProps: getInputProps({
                                placeholder: 'Search a country (start with a)',
                                id: 'integration-downshift-simple',
                            }),
                        })}
                        {isOpen ? (
                            <Paper className={classes.paper} square>
                                {getSuggestions(inputValue).map((suggestion, index) =>
                                    renderSuggestion({
                                        suggestion,
                                        index,
                                        itemProps: getItemProps({ item: suggestion.name }),
                                        highlightedIndex,
                                        selectedItem,
                                    }),
                                )}
                            </Paper>
                        ) : null}
                    </div>
                )}
            </Downshift>
        </div>
    );
}

AutocompleteInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutocompleteInput);