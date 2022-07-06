import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";
import { tokenReducer } from "./reducers/tokenReducer";

export default combineReducers({
  auth: authReducer,
  token: tokenReducer,
});
