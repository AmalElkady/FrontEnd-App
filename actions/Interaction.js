import {
  REQUEST_PP_ACCESS_APPROVE_REMOVE,
  REQUEST_PP_ACCESS_APPROVE_REMOVE_SUCCESS
} from "../constants/ActionTypes";

export const ppAccessApproveRemove = (
  action,
  profileid,
  country,
  city,
  varea
) => {
  return {
    type: REQUEST_PP_ACCESS_APPROVE_REMOVE,
    payload: { action, profileid, country, city, varea }
  };
};

export const ppAccessApproveRemoveSuccess = data => {
  return {
    type: REQUEST_PP_ACCESS_APPROVE_REMOVE_SUCCESS,
    payload: data
  };
};
