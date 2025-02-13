const Validator = require('validatorjs');
const validator = (body, rules, message, callback) => {
    const validation = new Validator(body, rules, message);
    validation.passes(() => callback(null,true));
    validation.fails(() => callback(validation.errors, false));
};
module.exports = validator;