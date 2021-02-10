import React from 'react'
//import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { Transition } from './'
import { BaseForm } from '../form'
import { withStyles } from '@material-ui/core/styles';

export const DialogFormSmall = (props) => {

    const {
        //classes,
        openDialog = true,
        title,
        rules,
        values,
        errors,
        onValues,
        onErrors,
        onCancel,
        onSave,
        children,
        dialogProps={},
        ...otherProps
    } = props;

    const {
        open = openDialog,
        fullScreen = false,
        onClose = onCancel,
        transition = Transition,
        ...otherDialogProps
    } = dialogProps;

    return (
        <BaseForm
            rules={rules}
            values={values}
            errors={errors}
            onValues={onValues}
            onErrors={onErrors}
            {...otherProps}>
            <Dialog
                fullScreen={fullScreen}
                TransitionComponent={transition}
                open={open}
                onClose={onClose}
                {...otherDialogProps}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={onCancel} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <DialogTitle className="text-capitalize">
                            {title}
                        </DialogTitle>
                    </Toolbar>
                <DialogContent ref={props.dialogContentRef}>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onCancel}>Cancel</Button>
                    <Button variant="contained" color="secondary" submit onClick={onSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </BaseForm>
    )
}

const styles = theme => ({
});

export default withStyles(styles)(DialogFormSmall);
