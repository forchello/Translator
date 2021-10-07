import {SET_RECOGN_RESULT, SET_MICRO_IS_LOADING} from '../actions/MicroActions';
import {InitialMicro} from '../initialsStates/MicroStates';

const microReducer = (state = InitialMicro, action) => {
  switch (action.type) {
    case SET_RECOGN_RESULT:
      return {...state, RecognResult: action.payload};
    case SET_MICRO_IS_LOADING:
      return {...state, MicroIsLoading: action.payload};
    default:
      return {...state};
  }
};

export default microReducer;
