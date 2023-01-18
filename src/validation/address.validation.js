const { body, check, validationResult } = require('express-validator');

exports.create = [
    body('street')
        .trim()
        .isLength({min:1, max:54})
        .withMessage('Invalid street'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    },
]