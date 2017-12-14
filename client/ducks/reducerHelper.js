function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    // console.log(initialState, action);
    if (action && handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

export {
  createReducer
};
