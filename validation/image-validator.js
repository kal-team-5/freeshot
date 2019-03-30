const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateImageInput(formInput) {
  let errors = {};
  formInput.url = !isEmpty(formInput.url) ? formInput.url : "";

  if (Validator.isEmpty(formInput.url)) {
    errors.text = "Image URL is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
