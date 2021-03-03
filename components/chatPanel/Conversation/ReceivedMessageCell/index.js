import React from "react";

const ReceivedMessageCell = ({ conversation, user }) => {
  return (
    <div className="d-flex flex-nowrap chat-item">
      <img
        className="rounded-circle avatar size-40 align-self-end"
        src="https://via.placeholder.com/150x150"
        alt=""
      />

      <div className="bubble">
        <div className="message">
          {/* {conversation.message} */}
          hello2
        </div>
        <div className="time text-muted text-right mt-2">
          {/* {conversation.sentAt} */}
          2:00 AM
        </div>
      </div>
    </div>
  );
};

export default ReceivedMessageCell;
