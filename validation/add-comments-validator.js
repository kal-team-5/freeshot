const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateComments(formInput) {
  let errors = {};

  //AddComments Form.
  formInput.text = !isEmpty(formInput.text) ? formInput.text : "";

  if (!Validator.isEmpty(formInput.text)) {
    if (!Validator.isLength(formInput.text, { min: 10, max: 300 })) {
      errors.text = "Comment must be between 10 and 300 characters";
    }
  }

  if (Validator.isEmpty(formInput.text)) {
    errors.text = "Please add comments";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
