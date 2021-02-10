import { resourceAction, ACTIONS } from './index'

export const login = () => ({
    type: resourceAction(ACTIONS.LOGIN),
    payload: {

    }
})

export const list = () => ({
    type: resourceAction(ACTIONS.LIST),
    payload: {

    }
})

export const view = (id) => ({
    type: resourceAction(ACTIONS.VIEW),
    payload: {

    }
})

export const create = () => ({
    type: resourceAction(ACTIONS.CREATE),
    payload: {

    }
})

export const edit = (id) => ({
    type: resourceAction(ACTIONS.EDIT),
    payload: {

    }
})

export const store = () => ({
    type: resourceAction(ACTIONS.STORE),
    payload: {

    }
})

export const destory = (id) => ({
    type: resourceAction(ACTIONS.DESTROY),
    payload: {

    }
})