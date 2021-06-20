import React from "react";
import moment from "moment";
import LockIcon from "@material-ui/icons/Lock";

const ReceivedMessageCell = ({ conversation, user }) => {
  return (
    <div className="d-flex flex-nowrap chat-item">
      <img
        className="rounded-circle avatar size-40 align-self-end"
        src={user._ ? user._ : "https://via.placeholder.com/150x150"}
        alt={user.n}
      />
      <div className="bubble">
        <div
          className={conversation.h == 1 ? "message bubble-blur" : "message"}
        >
          {conversation.m}
        </div>
        <div
          className={
            conversation.h == 1
              ? "time text-muted text-right mt-2  bubble-blur"
              : "time text-muted text-right mt-2"
          }
        >
          {moment(Number(conversation.d)).format("hh:mm A")}
        </div>
        {conversation.h == 1 ? (
          <div className="lock-mgs">
            <LockIcon />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ReceivedMessageCell;
