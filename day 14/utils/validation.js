const emailValidation = (email) => {
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailPattern.test(email);
};

const passwordValidate = (password) => {
  const passwordPattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  // console.log(passwordPattern.test(password));
  return passwordPattern.test(password);
};

module.exports = {
  emailValidation,
  passwordValidate,
};
