//profile.js
const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

 if (!isEmpty(data.gender)) {
    if(data.gender !='m' && data.gender !='M' && data.gender !='f' && data.gender !='F' && data.gender !='n' &&data.gender !='N')
      errors.gender ='m/f/n is valid gender name';
  }
  


    if(!validator.isEmail(data.email)) {
        errors.email ='Email is not valid';
    }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

