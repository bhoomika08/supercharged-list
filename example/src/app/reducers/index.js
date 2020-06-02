import ACTIONS from "../shared/react_action_types";

const INITIAL_STATE = {
  counter: 0,
  users: {}
}

/* if INCREASE/DECREASE ACTION detected, modify state as defined in payload*/
const counterReducer = (state=INITIAL_STATE, action) => {
  switch (action.type){
    case ACTIONS.increase:
    case ACTIONS.decrease:
      return {
        ...state,
        counter: state.counter + action.payload
      };
    case ACTIONS.updateUsers:
      return {
        ...state,
        users: {...state.users, ...action.payload}
      }  
    default:
      return state;   
  }
};

export default counterReducer;