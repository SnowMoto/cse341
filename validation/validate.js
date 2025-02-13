const validateRules = require ('./validate_rules');
const rules = (req, res, next) => {
    const valid = {
        username: 'required|string',
        password: 'required|string',  
        email: 'required|email',
        state: 'required|string',
        dirtbike: 'required|string',
        riding_style: 'required|string',
        rider_level:'required|string',
    };
    validateRules(req.body, valid, {}, (err,status) => {
        if (!status){
            res.status(412).send({
                success: false,
                message: 'Validation Failed',
                data: err
            });
        }else {
            next();
        }
    });
};
module.exports = { rules };