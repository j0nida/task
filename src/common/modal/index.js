import React from 'react'
import Slide from '@material-ui/core/Slide'

export { default as DialogForm } from './DialogForm';
export { default as DialogFormSmall } from './DialogFormSmall';


export const Transition = (props) => (<Slide direction="up" timeout="1000" {...props} />)

export const closeModal = (that, data) => {
    //let modalCloseHandlerName = 'onModalClose';
    //if (that.props.location.state && that.props.location.state.onModalClose)
    //    modalCloseHandlerName = that.props.location.state.onModalClose;

    //TODO: dispatch an event for the desired lists to listen to refresh accordingly
    //      probably on the AppRoutes and call the "componentWillReceiveProps" similarly as we do it on history.goBack
    console.log(this.props);
    console.log(data);
    that.props.location.state = { data, name: that.constructor.name };// onModalClose: modalCloseHandlerName };

    that.setState({ open: false });//START CLOSING EFFECT
    setTimeout(() => that.props.history.goBack(), 500);//WAIT FOR THE CLOSE EFFECT
}

export const onModalClose = (modalName, nextProps, callback, callbackOnEmptyData) => {
    if (nextProps.history.action !== "PUSH" &&
        nextProps.location.state &&
        nextProps.location.state.LAST_MODAL_STATE
    ) {
        if (nextProps.location.state.LAST_MODAL_STATE.name === modalName) {
            let modalData;
            if (nextProps.location.state.LAST_MODAL_STATE.data || callbackOnEmptyData) {
                modalData = { ...nextProps.location.state.LAST_MODAL_STATE.data };
                callback(modalData);
            }
            nextProps.location.state = null;

            return modalData;
        }
    }
}
