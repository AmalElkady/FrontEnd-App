import React from "react";
import moment from "moment";
import DoneAllIcon from "@material-ui/icons/DoneAll";
const SentMessageCell = ({ conversation, myPhoto, seen }) => {
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
          <DoneAllIcon
            fontSize="small"
            className="seenMgs"
            style={
              conversation.seen == false
                ? { color: "#a1a1a1" }
                : { color: "white" }
            }
          />
          {moment(Number(conversation.d)).format("hh:mm A")}
        </div>
      </div>
    </div>
  );
};

export default SentMessageCell;
