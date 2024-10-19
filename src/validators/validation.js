const { body, validationResult } = require('express-validator');

exports.validateRegister = [
  body('email').isEmail().withMessage('Email is invalid'),
  // Remove password validation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];
