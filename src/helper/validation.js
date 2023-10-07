class Validator {
  static validUserInfo(userDetails) {
    const { name, email, password } = userDetails;
    return (
      name &&
      typeof name === "string" &&
      name.length > 2 &&
      email &&
      typeof email === "string" &&
      email.length > 2 &&
      password &&
      typeof password === "string" &&
      password.length > 2
    );
  }

  static validLoginInfo(userDetails) {
    const { email, password } = userDetails;
    return (
      email &&
      typeof email === "string" &&
      email.length > 2 &&
      password &&
      typeof password === "string" &&
      password.length > 2
    );
  }
}
module.exports = Validator;
