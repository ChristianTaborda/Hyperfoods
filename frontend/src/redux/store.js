import { createStore, combineReducers, compose } from "redux";
import loginReducer from "./Login/reducer.js";
import templateReducer from "./Template/reducer.js";
import offlineReducer from "./Offline/reducer.js"

const reducers = combineReducers({
  loginReducer,
  templateReducer,
  offlineReducer,
});

const debugMiddleware = compose(
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
);

const store = createStore(reducers, debugMiddleware);

export default store;
