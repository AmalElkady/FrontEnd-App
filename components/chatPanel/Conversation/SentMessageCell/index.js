import React from "react";

const SentMessageCell = ({ conversation }) => {
  return (
    <div className="d-flex flex-nowrap chat-item flex-row-reverse">
      <img
        className="rounded-circle avatar size-40 align-self-end"
        src="https://via.placeholder.com/150x150"
        // alt={conversation.name}
      />

      <div className="bubble jambo-card">
        <div className="message">
          {/* {conversation.message} */}
          hello I'm a enginner
        </div>
        <div className="time text-muted text-right mt-2">
          {/* {conversation.sentAt} */}
          1:00 AM
        </div>
      </div>
    </div>
  );
};

export default SentMessageCell;
