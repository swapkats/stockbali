import { START_LOADING, STOP_LOADING } from '../actions/channel_actions';

const initialState = {
  type: 'none',
};

const LoadingReducer = (state = initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case START_LOADING:
      return merge(state, { type: action.loading });
    case STOP_LOADING:
      return merge(state, {
        type: 'none',
      });
    default:
      return state;
  }
};

export default LoadingReducer;
