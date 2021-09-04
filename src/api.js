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

export const deleteConversation = async (conversation_sid) => {
  await axios.delete(
    `https://backend.gogetwise.com/sms/conversation/delete/${conversation_sid}/`
  );
};

export const updateLastSeenMessage = async (conversation_sid) => {
  await axios.patch(
    `https://backend.gogetwise.com/sms/conversation/${conversation_sid}/unseen/update/`
  );
};

export const getUnseenMessagesNumber = async (conversation_sid) => {
  return await axios
    .get(
      `https://backend.gogetwise.com/sms/conversation/${conversation_sid}/unseen/`
    )
    .then((response) => {
      return response.data.unseen_messages;
    });
};
