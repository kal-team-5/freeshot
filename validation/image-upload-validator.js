const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateImageInput(formInput) {
  let errors = {};
  //ImageUpload Form.
  formInput.url = !isEmpty(formInput.url) ? formInput.url : "";
  formInput.caption = !isEmpty(formInput.caption) ? formInput.caption : "";

  if (Validator.isEmpty(formInput.url)) {
    errors.url = "Image URL is required";
  }

  if (!Validator.isEmpty(formInput.url)) {
    if (!Validator.isURL(formInput.url)) {
      errors.url = "Not a Valid URL";
    }
  }

  if (Validator.isEmpty(formInput.caption)) {
    errors.caption = "Please enter a Caption";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
