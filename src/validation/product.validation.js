const { body, check, validationResult } = require('express-validator');

exports.create = [/*
    body('name')
        .trim()
        .isLength({min:1, max:16}) // Validate minimum length of password
        .withMessage('Invalid product name'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    },
    body('description')
        .trim()
        .isLength({min:1, max:16}) // Validate minimum length of password
        .withMessage('Invalid description'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    },*/
]