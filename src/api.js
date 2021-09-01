const axios = require("axios");

export default function getRefreshedToken(emailAddress, password, identity) {
  return axios.post("backend.gogetwise.com/sms/token/", {
    email_address: emailAddress,
    password: password,
    identity: identity
  });
}
