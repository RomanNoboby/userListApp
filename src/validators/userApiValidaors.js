//--------------------------------------------------------------------------------------------------------------------//
class Validator {
    #errors = {}
    #validateFunctions = [];
    #validators = {
        isString: function (data) {
            return typeof data === "string";
        },
        isRegExp: function (data, props={}){
            console.log('isRegExp: function (data, props={}){');
            return !!(typeof data === "string" && data.match(props.regex));
        }
    }

    add(fieldName, validationObjets) {
        const validateFunction = {
            fieldName,
            validationObjets,
        }
        this.#validateFunctions.push(validateFunction);
    }

    validate(dataObject) {

        this.#validateFunctions.forEach(({fieldName, validationObjets}) => {
            const fieldErrors = [];

            validationObjets.forEach((validationObj) => {
                const currentValidator = validationObj.validator instanceof Function ?
                    validationObj.validator :
                    this.#validators[validationObj.validator];

                if (!currentValidator(dataObject[fieldName], validationObj.props)) {
                    fieldErrors.push(new Error(validationObj.message));
                }
            });
            if (fieldErrors.length) {
                this.#errors[fieldName] = fieldErrors;
            }
        });
    }

    getErrors() {
        return {...this.#errors}
    }
}

export function createUserValidator(req, res, next) {
    const validator = new Validator;

    validator.add('login', [
        { validator: 'isString', message: 'Request body error! `login` must be string.', props: {} },
        { validator: 'isRegExp', message: "Request body error' `login` wrong format ", props: {regex: "^[a-zA-Z0-9]+$"}},
    ]);
    validator.add('name', [
        { validator: 'isString', message: 'Request body error! `name` must be string.', props: {} },
        { validator: 'isRegExp', message: "Request body error' `name` wrong format", props: {regex: "^[a-zA-Z0-9 ]+$"}},
    ]);

    validator.add('email', [
        { validator: 'isString', message: 'Request body error! `email` must be string.', props: {} },
        { validator: 'isRegExp', message: "Request body error' `email` wrong format", props: {regex: "\\S+@\\S+\\.\\S+"}},
    ]);

    validator.validate(req.body);

    console.log('========= updateUserValidator result')
    console.log(validator.getErrors());

    next();
}

export function updateUserValidator(req, res, next) {
    const validator = new Validator;

    validator.add('login', [
        { validator: 'isString', message: 'Request body error! `login` must be string.', props: {} },
        { validator: 'isRegExp', message: "Request body error' `login` wrong format ", props: {regex: "^[a-zA-Z0-9]+$"}},
    ]);
    validator.add('name', [
        { validator: 'isString', message: 'Request body error! `name` must be string.', props: {} },
        { validator: 'isRegExp', message: "Request body error' `name` wrong format", props: {regex: "^[a-zA-Z0-9 ]+$"}},
    ]);

    validator.add('email', [
        { validator: 'isString', message: 'Request body error! `email` must be string.', props: {} },
        { validator: 'isRegExp', message: "Request body error' `email` wrong format", props: {regex: "\\S+@\\S+\\.\\S+"}},
    ]);

    validator.validate(req.body);

    console.log('========= updateUserValidator result')
    console.log(validator.getErrors());

    next();
}

