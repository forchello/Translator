export const SET_RECOGN_RESULT = 'SET_RECOGN_RESULT';
export const SET_MICRO_IS_LOADING = 'SET_MICRO_LOADING';

export const setRecognResult = RecognResult => dispatch => {
  dispatch({
    type: SET_RECOGN_RESULT,
    payload: RecognResult,
  });
};

export const setMicroIsLoading = MicroIsLoading => dispatch => {
  dispatch({
    type: SET_MICRO_IS_LOADING,
    payload: MicroIsLoading,
  });
};
