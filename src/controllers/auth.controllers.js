
exports.loginPage = async (req, res) => {
    const fleshFormData = req.flash('signIn-formData');
    res.render('pages/login', {title: 'Login page' , formData: fleshFormData[0] || undefined, req });
}

exports.signUpPage = async (req, res) => {
    const fleshFormData = req.flash('formData');
    res.render('pages/signup', {title: 'SingUp',  formData: fleshFormData[0] || undefined, req});
}

