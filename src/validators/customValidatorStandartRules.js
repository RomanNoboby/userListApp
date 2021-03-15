import db from "../models";

async function isValueUnique( fieldValue, props = {columnName: undefined} ){
    const User = db.users;
    const queryParams = {};

    if (fieldValue && props && props.columnName ){
        queryParams[fieldValue.fieldName] = fieldValue;
        const user = await User.findOne({where: queryParams});
        return !!!!user
    }
    return false;
}

const rules = {
    login: [
        { validator: 'isString', message: 'Request body error! `login` must be string.', props: {} },
        { validator: 'isRegExp', message: "Request body error' `login` wrong format ", props: {regex: "^[a-zA-Z0-9]+$"}},
    ],
    name: [
        { validator: 'isString', message: 'Request body error! `name` must be string.', props: {} },
        { validator: 'isRegExp', message: "Request body error' `name` wrong format", props: {regex: "^[a-zA-Z0-9 ]+$"}},
    ],
    email: [
        { validator: 'isString', message: 'Request body error! `email` must be string.', props: {} },
        { validator: 'isRegExp', message: "Request body error' `email` wrong format", props: {regex: "\\S+@\\S+\\.\\S+"}},
    ],
}
export default rules