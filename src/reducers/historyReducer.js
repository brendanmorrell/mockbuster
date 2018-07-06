const historyReducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_HISTORY_TO_STORE': {
      return { history: action.payload };
    }
    default:
      return state;
  }
};
export default historyReducer;
