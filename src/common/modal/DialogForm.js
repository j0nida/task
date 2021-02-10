import React from 'react'
//import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { Transition } from './'
import { BaseForm } from '../form'
import { Restricted } from '../rights'
import { withStyles } from '@material-ui/core/styles'

export const DialogForm = props => {
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
        dialogProps = {},
        resource,
        isNew,
        restricted = false,
        ...otherProps
    } = props;

    const {
        open = openDialog,
        fullScreen = true,
        onClose = onCancel,
        transition = Transition,
        ...otherDialogProps
    } = dialogProps;

    return (
        <Restricted model={resource} right={isNew ? 'create' : 'edit'} shouldRestrict={restricted}>
            <BaseForm
                rules={rules}
                values={values}
                errors={errors}
                onValues={onValues}
                onErrors={onErrors}
                {...otherProps}
            >
                <Dialog
                    fullScreen={fullScreen}
                    TransitionComponent={transition}
                    open={open}
                    onClose={onClose}
                    {...otherDialogProps}
                >
                    <AppBar position="static" style={{backgroundColor:"#0B393F"}}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={onCancel} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className="text-capitalize">
                                {title}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent ref={props.dialogContentRef}>
                        <div className="modal-container">{children}</div>
                    </DialogContent>

                    <DialogActions className="action-bar">
                        <Button color="primary" onClick={onCancel}>
                            Cancel
                        </Button>

                        <Button variant="outlined" color="secondary" submit onClick={onSave}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </BaseForm>
        </Restricted>
    );
};

const styles = theme => ({});

export default withStyles(styles)(DialogForm);
