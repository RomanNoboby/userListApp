import CustomValidator from "./CustomValidator";
import rules from "./customValidatorStandartRules"

export function createUserValidator(req, res, next) {
    const validator = new CustomValidator;

    validator.add('login', rules.login);
    validator.add('email', rules.email);
    validator.add('name', rules.name);

    validator.validate(req.body);

    console.log('========= updateUserValidator result')
    console.log(validator.getErrors());

    next();
}

export function updateUserValidator(req, res, next) {
    const validator = new CustomValidator;

    validator.add('login', rules.login);
    validator.add('email', rules.email);
    validator.add('name', rules.name);

    // validator.add('login', [
    //     { validator: 'isString', message: 'Request body error! `login` must be string.', props: {} },
    //     { validator: 'isRegExp', message: "Request body error' `login` wrong format ", props: {regex: "^[a-zA-Z0-9]+$"}},
    // ]);
    // validator.add('name', [
    //     { validator: 'isString', message: 'Request body error! `name` must be string.', props: {} },
    //     { validator: 'isRegExp', message: "Request body error' `name` wrong format", props: {regex: "^[a-zA-Z0-9 ]+$"}},
    // ]);
    //
    // validator.add('email', [
    //     { validator: 'isString', message: 'Request body error! `email` must be string.', props: {} },
    //     { validator: 'isRegExp', message: "Request body error' `email` wrong format", props: {regex: "\\S+@\\S+\\.\\S+"}},
    // ]);

    validator.validate(req.body);

    console.log('========= updateUserValidator result')
    console.log(validator.getErrors());

    next();
}

