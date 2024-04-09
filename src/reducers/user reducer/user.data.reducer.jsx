import {
  USER_ERROR,
  USER_REQUEST,
  USER_FRIEND_REQUESTS,
  USER_ACCEPT_REQUEST,
  USER_REMOVE_FRIEND,
  USER_FRIENDS,
  USER_SEND_REQUEST,
  USER_REMOVE_SEND_REQUEST,
  USER_REMOVE_REQUEST,
} from "../../constants/user.constants";

export const userRequestsReducer = (state, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return { ...state, loading: true, error: "" };

    case USER_FRIEND_REQUESTS:
      return {
        ...state,
        loading: false,
        friendRequestsToUser: action.payload.toUser,
        friendRequestsFromoUser: action.payload.fromUser,
      };
    case USER_FRIENDS:
      return {
        ...state,
        loading: false,
        friends: action.payload,
      };
    case USER_SEND_REQUEST:
      return {
        ...state,
        loading: false,
        friendRequestsFromUser: [
          ...state.friendRequestsFromUser,
          action.payload,
        ],
      };
    case USER_REMOVE_SEND_REQUEST:
      const removedReqUserId = action.payload;
      const remaningSendRequests = state.friendRequestsFromUser.filter(
        (req) => req.toUserId !== removedReqUserId
      );
      return {
        ...state,
        loading: false,
        friendRequestsFromUser: remaningSendRequests,
      };

    case USER_ACCEPT_REQUEST:
      const acceptedReqId = action.payload;
      const remaningRequests = state.friendRequestsToUser.filter(
        (req) => req.id !== acceptedReqId
      );
      return {
        ...state,
        loading: false,
        friendRequestsToUser: remaningRequests,
      };

    case USER_REMOVE_REQUEST:
      const removedReqId = action.payload;
      const remaningRequests2 = state.friendRequestsToUser.filter(
        (req) => req.id !== removedReqId
      );
      return {
        ...state,
        loading: false,
        friendRequestsToUser: remaningRequests2,
      };

    case USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
