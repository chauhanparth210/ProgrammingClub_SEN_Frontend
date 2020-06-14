import { combineReducers } from "redux";
import authReducer from "./authReducer";
import loadReducer from "./loadingReducer";

export default combineReducers({
  auth: authReducer,
  isLoading: loadReducer
});
