import { COMMON_CRUD_ACTIONS, getResourceAction } from '../utils/constants'

export { default as Login } from './Login';

// CONSTANTS
export const RESOURCE = "AUTH";
export const ACTIONS = {
    ...COMMON_CRUD_ACTIONS,
    LOGIN: "LOGIN"
};
export const resourceAction = (action) => {
    return getResourceAction(RESOURCE, ACTIONS[action]);
}

// REDUCER 
const initialState = {
    user: { id: 1, username: "admin", role: "super_user"}
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case resourceAction(ACTIONS.LOGIN):
            return {...state.user};
        default:
            return state.user;
    }
}