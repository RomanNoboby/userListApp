export default class CustomValidator {
    #errors = {}
    #validateFunctions = [];
    #validators = {
        isString: function (data) {
            return typeof data === "string";
        },
        isRegExp: function (data, props={}){
            // console.log('isRegExp: function (data, props={}){');
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