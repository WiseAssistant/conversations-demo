const axios = require("axios");

export const getRefreshedToken = async (emailAddress, password, identity) => {
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
};

export const createConversation = async (token, phone_number, identity) => {
  await axios.post("https://backend.gogetwise.com/sms/conversation/create/", {
    token: token,
    phone_number: phone_number,
    identity: identity
  });
};
