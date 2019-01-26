import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import * as reducers from "./reducers";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
  ...reducers
});

// const persistedState = loadState();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
  //   persistedState
);

export default store;
