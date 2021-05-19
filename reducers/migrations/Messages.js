export const messagesMigration = {
  1: previousVersionState => ({
    timestampMap: previousVersionState.timestampMap,
    returnedProfilesOnlineStatus:
      previousVersionState.returnedProfilesOnlineStatus
    // clickedUserChat: previousVersionState.clickedUserChat
  })
};
