import React from "react";
import moment from "moment";

const ReceivedMessageCell = ({ conversation, user }) => {
  return (
    <div className="d-flex flex-nowrap chat-item">
      <img
        className="rounded-circle avatar size-40 align-self-end"
        src={user._ ? user._ : "https://via.placeholder.com/150x150"}
        alt={user.n}
      />

      <div className="bubble">
        <div className="message">{conversation.m}</div>
        <div className="time text-muted text-right mt-2">
          {moment(Number(conversation.d)).format("hh:mm A")}
        </div>
      </div>
    </div>
  );
};

export default ReceivedMessageCell;
