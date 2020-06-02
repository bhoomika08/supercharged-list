//------- MIDDLEWARE --------- //
import counterReducer from "../reducers";
import { createStore, applyMiddleware } from "redux";

const logger = ({ dispatch, getState }) => {
  return next => action => {
    console.log("prev-store :>> ", getState());
    console.log("action-type: ", action.type, "action-payload: ", action.payload);
    next(action);
    console.log("next-store :>> ", getState());
  };
};

const thunk = ({ dispatch, getState }, extraArg) => {
  return next => action => {
    if (typeof action === "function") {
      action(dispatch, getState, extraArg);
    } else {
      next(action);
    }
  };
};

const generateStore = () => {
  const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
  return createStoreWithMiddleware(counterReducer);
};

const appStore = generateStore();

export default appStore;
