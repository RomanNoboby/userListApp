
exports.loginPage = async (req, res) => {

    res.render('pages/login', {title: 'UserList Login' , req });
}

exports.signUpPage = async (req, res) => {
    const fleshFormData = req.flash('formData');
    // const formData = fleshFormData[0]||undefined;
    res.render('pages/signup', {title: 'UserList SingUp',  formData: fleshFormData[0] || undefined, req});
}

