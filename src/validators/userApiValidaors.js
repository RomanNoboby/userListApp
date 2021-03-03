import InternalServerErrorException from "../errors/InternalServerErrorException";
import BadRequestException from "../errors/BadRequestException";


function isStringValid( data ){
    if (data && typeof data === "string") {
        return true;
    }
    return false;
}
function isStringLengthInRange(data, min, max){
    const len = data.length;

    if ( isStringValid(data) && len >= min && len <= max) {
        return true;
    }
    return false;
}

function validateName( name, errors ){
    let nameErrors = [];

    if (!isStringValid(name)){
        nameErrors.push( new BadRequestException('Request body error! `name` must be string and not empty'));
    }
    if (!isStringLengthInRange(name,6,50)){
        nameErrors.push( new BadRequestException('Request body error! `name` length must by in range from 6 to 60'));
    }

    if (nameErrors.length){
        return  {
            propertyName: 'name',
            err: nameErrors
        };
    }
}

function validateLogin( login ){
    let loginErrors = [];

    if (!isStringValid(login)){
        loginErrors.push( new BadRequestException('Request body error! `login` must be string and not empty'));
    }
    if (!isStringLengthInRange(login,6,50)){
        loginErrors.push( new BadRequestException('Request body error! `login` length must by in range from 6 to 60'));
    }

    if (loginErrors.length){
        return  {
            propertyName: 'login',
            err: loginErrors
        };
    }
}

function validateEmail( email,errors ){
    let emailErrors = [];

    if (!isStringValid(email)){
        emailErrors.push( new BadRequestException('Request body error! `email` must be string and not empty'));
    }
    if (!isStringLengthInRange(email,6,50)){
        emailErrors.push( new BadRequestException('Request body error! `email` length must by in range from 8 to 60'));
    }
    if (email.indexOf("@") === -1) {
        emailErrors.push( new BadRequestException('Request body error! `email` must include @'));
    }

    if (emailErrors.length){
        return  {
            propertyName: 'email',
            err: emailErrors
        };
    }
}

class Validator {
    #errors = {}
    #validateFunctions = [];

    add(validateFunction){
        this.#validateFunctions.push( validateFunction );
    }

    validate(){
        this.#validateFunctions.forEach((func)=>{
           const funcResult = func();
           if (funcResult){
               this.#errors[funcResult.propertyName] = funcResult.err
           }
        });
    }

    getErrors(){
        return {...this.#errors}
    }
}

export function createUserValidator (req, res, next){
   const validator = new Validator();

   validator.add(()=>validateLogin(req.body.login));
   validator.add(()=> validateEmail(req.body.email));
   validator.add(()=> validateName(req.body.name));

   validator.validate();

   console.log('========= createUserValidator result')
   console.log(validator.getErrors());

   next();
}

export function updateUserValidator (req, res, next){
    const validator = new Validator();

    validator.add(()=>validateLogin(req.body.login));
    validator.add(()=> validateEmail(req.body.email));
    validator.add(()=> validateName(req.body.name));

    validator.validate();

    console.log('========= updateUserValidator result')
    console.log(validator.getErrors());

    next();
}

