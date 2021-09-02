import React from "react";

class FormModal extends React.Component {
  render() {
    const formContent = <div>"test"</div>;
    const modal = this.props.showModal ? <div>{formContent}</div> : null;
    return <div>{modal}</div>;
  }
}

export default FormModal;
