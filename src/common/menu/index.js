import { getResourceAction } from '../utils/constants'

export { default as menuItems } from './menuItems'
export { default as AccountMenu } from './accountMenu'
export { default as MobileMenu } from './mobileMenu'
export { default as ModalMenu } from './modalMenu'
export { default as SideInfo } from './sideInfo'
export { default as NotificationCard } from './notifications'

// CONSTANTS
export const RESOURCE = "HEADER";
export const ACTIONS = {
    LOGOUT: "LOGOUT"
};
export const resourceAction = (action) => {
    return getResourceAction(RESOURCE, ACTIONS[action]);
}

// REDUCER 
const initialState = {
    user: {}
}

export const roomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case resourceAction(ACTIONS.LOGOUT):
            return initialState;
        default:
            return initialState;
    }
}
