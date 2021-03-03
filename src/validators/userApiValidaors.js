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
       errors['name']=nameErrors;
    }
}

function validateLogin( login,err ){
    let loginErrors = [];

    if (!isStringValid(login)){
        loginErrors.push( new BadRequestException('Request body error! `login` must be string and not empty'));
    }
    if (!isStringLengthInRange(login,6,50)){
        loginErrors.push( new BadRequestException('Request body error! `login` length must by in range from 6 to 60'));
    }

    if (loginErrors.length){
        err['login']= loginErrors
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

    if(emailErrors.length){
        errors['email']=emailErrors;
    }
}

export function createUserValidator (req, res, next){
   let errors = {};
   validateLogin(req.body.login,errors);
   validateEmail(req.body.email, errors);
   validateName(req.body.name, errors);

   console.log(errors);
   next();
}

export function updateUserValidator (req, res, next){
    let errors = {};
    validateName(req.body.name, errors);
    validateLogin(req.body.login, errors);
    validateEmail(req.body.email, errors);

    console.log(errors);
    next();
}

