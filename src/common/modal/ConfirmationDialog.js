import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const ConfirmationDialog = (props) => {

    const {
        title = 'Confirmation',
        message = 'Are you sure?',
        cancelText = 'Cancel',
        okText = 'OK',
        value,
        onConfirm,
        ...otherProps
    } = props;

    const handleClose = (confirmed) => {
        if (onConfirm)
            onConfirm(confirmed, value);
    }

    return (
        <div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
                {...otherProps}
            >
                <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <div style={{ padding: '20px 60px' }}>
                        {message}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)} color="primary">
                        {cancelText}
                    </Button>
                    <Button onClick={() => handleClose(true)} color="primary">
                        {okText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ConfirmationDialog

