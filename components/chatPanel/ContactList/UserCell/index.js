import React from "react";

const UserCell = ({ onSelectUser, selectedSectionId, user }) => {
  return (
    <div
      // ${
      //   selectedSectionId === user.id ? "active" : ""
      // }
      className={`chat-user-item active 
      `}
      // onClick={() => {
      //   onSelectUser(user);
      // }}
    >
      <div className="chat-user-row row">
        <div className="chat-avatar col-xl-2 col-3">
          <div className="chat-avatar-mode">
            <img
              // src={user.thumb}
              src="https://via.placeholder.com/150x150"
              className="rounded-circle size-40"
              alt="Abbott"
            />
            {/* ${user.status} */}
            <span className={`chat-mode smallcal active`} />
          </div>
        </div>

        <div className="chat-contact-col col-xl-10 col-9">
          {/* {user.name} */}
          <div className="h4 name">Amal Atef</div>
          <div className="chat-info-des">
            {/* {user.mood.substring(0, 30) + "..."} */}
            typing ...
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCell;
