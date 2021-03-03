import React from "react";

const UserCell = ({ chat, selectedSectionId, onSelectUser }) => {
  return (
    <div
      // key={chat.id}
      // ${
      //   selectedSectionId === chat.id ? "active" : ""
      // }
      className={`chat-user-item active 
      `}
      // onClick={() => {
      //   onSelectUser(chat);
      // }}
    >
      <div className="chat-user-row row">
        <div className="chat-avatar col-xl-2 col-3">
          <div className="chat-avatar-mode">
            <img
              src="https://via.placeholder.com/150x150"
              className="rounded-circle size-40"
              // alt={chat.name}
            />
            {/* ${chat.status} */}
            <span className={`chat-mode small `} />
          </div>
        </div>

        <div className="chat-info col-xl-8 col-6">
          {/* {chat.name} */}
          <span className="name h4">ahmed</span>
          <div className="chat-info-des">
            {/* {chat.lastMessage.substring(0, 25) + "..."} */}
            typing
          </div>
          {/* {chat.lastMessageTime} */}
          <div className="last-message-time">hello hello</div>
        </div>

        <div className="chat-date col-xl-2 col-3">
          <div className="bg-primary rounded-circle badge text-white">
            {/* {chat.unreadMessage} */}
            unread
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCell;
