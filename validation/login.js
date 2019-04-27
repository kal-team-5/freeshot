const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){

    let errors = {};
    
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
   

    

    if(validator.isEmpty(data.username)) {
        errors.username ='username field is required';
    }

    if(validator.isEmpty(data.name)) {
        errors.username ='name field is required';
    }
   
    if (!validator.isLength(data.password,{min : 2,max:30})){
        errors.password = 'password must be between 2 and 30 characters';
    }
    if(validator.isEmpty(data.password)) {
        errors.password ='password field is required';
    }
    
    return{
        errors,
        isValid: isEmpty(errors)
    }
}