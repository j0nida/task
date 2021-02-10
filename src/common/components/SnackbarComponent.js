import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Transition } from '../modal'

const SnackbarComponent = (props) => {

    const {
        message = '',
        actionText,
        showClose = true,
        closeOnClickAway = true,
        autoHideDuration = 6000,
        onClose,
        ...otherProps
    } = props;

    const actions = [];
    if (actionText) {
        actions.push(
            <Button key="undo" color="secondary" size="small" onClick={(event) => handleClose(event, "action")}>
                {actionText}
            </Button>
        );
    }
    if (showClose) {
        actions.push(
            <IconButton key="close" aria-label="Close" color="inherit" onClick={(event) => handleClose(event, "close")}>
                <CloseIcon />
            </IconButton>
        );
    }
    
    const handleClose = (event, reason) => {
        if (!closeOnClickAway && reason === 'clickaway') {
            return;
        }
        if (onClose)
            onClose(reason);
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            TransitionComponent={Transition}
            onClose={handleClose}
            autoHideDuration={autoHideDuration}
            snackbarcontentprops={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message}</span>}
            action={actions}
            {...otherProps}
        />
    )
}

export default SnackbarComponent;