import React from "react";
import moment from "moment";

const SentMessageCell = ({ conversation, myPhoto }) => {
  return (
    <div className="d-flex flex-nowrap chat-item flex-row-reverse">
      <img
        className="rounded-circle avatar size-40 align-self-end"
        src={myPhoto ? myPhoto : "https://via.placeholder.com/150x150"}
        alt=""
      />

      <div className="bubble jambo-card">
        <div className="message">{conversation.m}</div>
        <div className="time text-muted text-right mt-2">
          {moment(Number(conversation.d)).format("hh:mm A")}
        </div>
      </div>
    </div>
  );
};

export default SentMessageCell;
