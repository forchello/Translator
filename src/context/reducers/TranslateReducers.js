import {
  SET_TARGET_TEXT,
  SET_SOURCE_TEXT,
  SET_IS_MAX_LENGTH,
} from '../actions/TranslateActions';

import {InitialLanguage} from '../initialsStates/TranslateStates';

const translateReducer = (state = InitialLanguage, action) => {
  switch (action.type) {
    case SET_TARGET_TEXT:
      return {...state, TargetText: action.payload};
    case SET_SOURCE_TEXT:
      return {...state, SourceText: action.payload};
    case SET_IS_MAX_LENGTH:
      return {...state, IsMaxLength: action.payload};
    default:
      return {...state};
  }
};

export default translateReducer;
