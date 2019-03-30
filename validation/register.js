const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){

    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password) ? data.password2 : ''; // this is not in model but need it in UI

    if (!validator.isLength(data.name,{min : 2,max:30})){
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if(validator.isEmpty(data.name)) {
        errors.name ='Name field is required';
    }

    if(validator.isEmpty(data.username)) {
        errors.username ='username field is required';
    }
   /* if(!validator.isusername(data.username)) {
        errors.username ='username is not valid';
    }*/
    
    if (!validator.isLength(data.password,{min : 2,max:30})){
        errors.password = 'password must be between 2 and 30 characters';
    }
    if(validator.isEmpty(data.password)) {
        errors.password ='password field is required';
    }
    if(validator.isEmpty(data.password2)) {
        errors.password2 ='confirm password field is required';
    }

    if(!validator.equals(data.password,data.password2)){
        errors.password2 = 'Password must match';
    }
    return{
        errors,
        isValid: isEmpty(errors)  //if errors is empty means there are no errors it is valid
    }
}