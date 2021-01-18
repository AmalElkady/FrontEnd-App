import { REQUEST_PP_ACCESS_APPROVE_REMOVE_SUCCESS } from "../constants/ActionTypes";

const initialProfileState = {
  ppAccessApproveRemove: false
};

const Interaction = (state = initialProfileState, action) => {
  switch (action.type) {
    case REQUEST_PP_ACCESS_APPROVE_REMOVE_SUCCESS: {
      return {
        ...state,
        ppAccessApproveRemove: action.payload
      };
    }
    default:
      return state;
  }
};

export default Interaction;
