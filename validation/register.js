const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //sanity check

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is Required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is Invalid";
  }

  //password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "password field cannot be empty";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field cannot be empty";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be atleast six charactors long";
  }
  if (!Validator.equals(data.password,data.password2)){
    errors.password2='password must Match';
  }
  return {
    errors,
    isValid:isEmpty(errors)
  };
};
