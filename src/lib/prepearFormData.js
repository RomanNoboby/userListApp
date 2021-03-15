const  prepareFormData = function (someFields, req, expressValidatorErrors){
    const formData = {};
    someFields.forEach((e)=>{
        const paramValue = req.body[e];
        const validateErrors = undefined;
        const err = expressValidatorErrors.filter(n => n.param === e)
        formData[e]= {value:paramValue, errors: err[0] ? err : undefined }
    });
    return formData;
}

export default prepareFormData;