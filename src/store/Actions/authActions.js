import axios from "axios";
import setAuthToken from "../../utils/SetAuthToken";
// import { toast } from "react-toastify";
import {
  SET_CURRENT_USER,
  DATA_LOADING,
  LOGOUT_USER,
  DATA_LOADED
} from "../type";
import { SERVER_URL } from "../../utils/constants";

// Register User
export const registerUser = (userData, history) => dispatch => {
  dispatch({
    type: DATA_LOADING
  });
  axios
    .post(`${SERVER_URL}/auth/signup`, userData)
    .then(res => {
      // toast.info(`${res.data.message}`);
      dispatch({
        type: DATA_LOADED
      });
      history.push("/login");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: DATA_LOADED
      });
      // if (typeof err.response !== undefined) {
      //   // toast.error(`Unable to register!..`);
      // } else {
      //   // toast.error(`${err.response.data.message}`);
      // }
    });
};

// Login - Get User Token
export const loginUser = (userData, history, from) => dispatch => {
  dispatch({
    type: DATA_LOADING
  });
  axios
    .post(`${SERVER_URL}/auth/signin`, userData)
    .then(res => {
      // Save to localStorage
      const { token, user } = res.data;

      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);

      dispatch(setCurrentUser(user));

      history.replace(from);

      dispatch({
        type: DATA_LOADED
      });
      // toast.info(`${res.data.message}`);
    })
    .catch(err => {
      dispatch({
        type: DATA_LOADED
      });
      console.log(err);
      // if (typeof err.response !== undefined) {
      //   toast.error(`Unable to login!..`);
      // } else {
      // toast.error(`${err.response.data.message}`);
      // }
    });
};

// Set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  dispatch({
    type: DATA_LOADING
  });
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch({
    type: LOGOUT_USER
  });

  dispatch({
    type: DATA_LOADED
  });
};
