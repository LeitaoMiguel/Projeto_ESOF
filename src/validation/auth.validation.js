const { body, check, validationResult } = require('express-validator');

exports.login = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .isLength({min:1})
        .withMessage('Please enter a password'),,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
]

exports.signup = [
    body('email')
        .trim()
        .isEmail()/*
        .custom((value, {req, loc, path}) => {
                return Users.findOne({
                    where: {
                        username: req.body.username,
                    }
                }).then(user => {
                    if (user) {
                        return Promise.reject('Username already in use');
                    }
                });
            })*/
        .withMessage('Invalid email'),
    body('password')
        .isLength({min:4, max:16})
        .withMessage('Password too short or too long'),
    check('confirmPassword')
        .trim() // To delete leading and trailing space
        .isLength({min:4, max:16}) // Validate minimum length of password
        .withMessage('Password must be between 4 to 16 characters') // Custom message
        .custom(async (confirmPassword, {req}) => { // Custom validation
            const password = req.body.password // Validate confirmPassword
            if(password !== confirmPassword) { // If password and confirm password not same
                throw new Error('Passwords must be same') // don't allow to sign up and throw error
            }
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
]