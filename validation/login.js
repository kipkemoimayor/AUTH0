const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //sanity checks

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field cannot be empty";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not Valid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

//
//235551d
