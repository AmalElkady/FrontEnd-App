import {
  REQUEST_PP_ACCESS_APPROVE_REMOVE_SUCCESS,
  GET_PHOTO_PP_READ_OUTGOING_REQUESTS_APPROVALES_SUCCESS
} from "../constants/ActionTypes";

const initialProfileState = {
  ppAccessApproveRemove: false,
  outgoingRequestsData: null
};

const Interaction = (state = initialProfileState, action) => {
  switch (action.type) {
    case REQUEST_PP_ACCESS_APPROVE_REMOVE_SUCCESS: {
      return {
        ...state,
        ppAccessApproveRemove: action.payload
      };
    }
    case GET_PHOTO_PP_READ_OUTGOING_REQUESTS_APPROVALES_SUCCESS: {
      console.log("form reducer outgoing ", action.payload);
      return {
        ...state,
        outgoingRequestsData: action.payload
      };
    }
    default:
      return state;
  }
};

export default Interaction;
