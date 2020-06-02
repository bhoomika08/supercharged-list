import ACTIONS from "../shared/react_action_types";

const appActions = {
  increaseActionCreator: () => (dispatch, getState) => {
    console.log('increase counter :>> ', getState().counter);
    dispatch ({
      type: ACTIONS.increase,
      payload: 1
    })
  },
  decreaseActionCreator: () => (dispatch, getState) => {
    console.log('decrease counter :>> ', getState().counter);
    dispatch ({
      type: ACTIONS.decrease,
      payload: -1
    })
  },
  updateUsers: data => (dispatch, getState) => {
    dispatch ({
      type: ACTIONS.updateUsers,
      payload: data
    })
  }
}

export default appActions;