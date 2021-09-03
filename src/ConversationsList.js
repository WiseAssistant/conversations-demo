import React, { Fragment } from "react";
import { List, Typography } from "antd";

import conversationsListStyles from "./assets/ConversationsList.module.css";
import conversationsItemStyles from "./assets/ConversationsItem.module.css";
import { deleteConversation } from "./api";
import { joinClassNames } from "./utils/class-name";
import Modal from "react-modal";

const { Text } = Typography;

export class ConversationsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDeleteModal: false,
      deleteConversationSid: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModalHandler = this.showModalHandler.bind(this);
    this.hideModalHandler = this.hideModalHandler.bind(this);
  }

  async handleSubmit(event) {
    deleteConversation(this.state.deleteConversationSid);
    this.setState({ showDeleteModal: false, deleteConversationSid: null });
    event.preventDefault();
  }

  showModalHandler = (event) => {
    debugger;
    this.setState({
      showDeleteModal: true,
      deleteConversationSid: event.target.attributes.value.value
    });
    event.preventDefault();
  };

  hideModalHandler = (event) => {
    this.setState({ showDeleteModal: false });
    event.preventDefault();
  };

  render() {
    const {
      conversations,
      selectedConversationSid,
      onConversationClick
    } = this.props;

    return (
      <Fragment>
        <Modal isOpen={this.state.showDeleteModal}>
          <text>Are you sure you want to delete this conversation?</text>
          <button onClick={this.handleSubmit}>Delete</button>
          <button onClick={this.hideModalHandler}>cancel</button>
        </Modal>
        <List
          header={"Open Conversations"}
          className={conversationsListStyles["conversations-list"]}
          bordered={true}
          loading={conversations.length === 0}
          dataSource={conversations}
          renderItem={(item) => {
            const activeChannel = item.sid === selectedConversationSid;
            const conversationItemClassName = joinClassNames([
              conversationsItemStyles["conversation-item"],
              activeChannel &&
                conversationsItemStyles["conversation-item--active"]
            ]);

            return (
              <List.Item
                key={item.sid}
                onClick={() => onConversationClick(item)}
                className={conversationItemClassName}
              >
                <Text
                  strong
                  className={conversationsItemStyles["conversation-item-text"]}
                >
                  {item.friendlyName || item.sid}
                </Text>
                <button onClick={this.showModalHandler} value={item.sid}>
                  Delete
                </button>
              </List.Item>
            );
          }}
        />
      </Fragment>
    );
  }
}
