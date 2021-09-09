import React from "react";
import { useSelector } from "react-redux";

import LoveNotifications from "./LoveNotification";

const AppNotification = () => {
  const headerSelectedIcon = useSelector(
    state => state.interaction.headerSelectedIcon
  );

  return <>{headerSelectedIcon == "love" && <LoveNotifications />}</>;
};

export default AppNotification;
