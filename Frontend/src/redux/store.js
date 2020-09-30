import { createStore, compose } from "redux";
import loginReducer from "./Login/reducer";

const debugMiddleware = compose(
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
);

const store = createStore(loginReducer, debugMiddleware);

export default store;
