const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateImageInput(formInput) {
  let errors = {};
  //ImageUpload Form.
  formInput.url = !isEmpty(formInput.url) ? formInput.url : "";
  
  if (Validator.isEmpty(formInput.url)) {
    errors.url = "Image URL is required";
  }
  if (!Validator.isEmpty(formInput.url)) {
    if (!Validator.isURL(formInput.url)) {
      errors.url = "Not a Valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
