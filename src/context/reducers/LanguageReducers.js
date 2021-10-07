import {SET_TARGET_LANG, SET_SOURCE_LANG} from '../actions/LanguageActions';
import {InitialLanguage} from '../initialsStates/LanguageStates';

const langReducer = (state = InitialLanguage, action) => {
  switch (action.type) {
    case SET_TARGET_LANG:
      return {...state, TargetLang: action.payload};
    case SET_SOURCE_LANG:
      return {...state, SourceLang: action.payload};
    default:
      return {...state};
  }
};

export default langReducer;
