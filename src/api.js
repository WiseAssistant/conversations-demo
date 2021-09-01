const axios = require("axios");

export default async function getRefreshedToken(
  emailAddress,
  password,
  identity
) {
  var token = await axios
    .post("https://backend.gogetwise.com/sms/token/", {
      email_address: emailAddress,
      password: password,
      identity: identity
    })
    .then((response) => {
      return response.data.token;
    });
  debugger;
  return token;
}
