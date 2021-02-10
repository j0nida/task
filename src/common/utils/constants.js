//COMMON CRUD/RESTful ACTIONS
export const COMMON_CRUD_ACTIONS = {
    LIST: "LIST",
    VIEW: "VIEW",
    CREATE: "CREATE",
    EDIT: "EDIT",
    STORE: "STORE",
    DESTROY: "DESTROY"
}

//CONCAT RESOURCE NAME WITH THE GIVEN ACTION
export const getResourceAction = (resource, action) => {
    if (!action)
        throw new Error(`Incorrect Action="${action}" provided for Resource="${resource}", most likely the action is not specified on ACTIONS constant.`);
    return resource + '_' + action;
}
