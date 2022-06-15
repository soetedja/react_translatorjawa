import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import appSettingReducer from './appSettingReducer';
import appReducer from './appReducer';
import authReducer from './authReducer';
import createReducerWithNamedType from './baseReducer';
import donationReducer from './donationReducer';
import donorReducer from './donorReducer';
import roleReducer from './roleReducer';
import wordTypeReducer from './wordTypeReducer';
import messageReducer from './messageReducer';
import languageReducer from './languageReducer';
import reduceReducers from 'reduce-reducers';
import statusReducer from './statusReducer';
import translationReducer from './translationReducer';
import starredTranslationReducer from './starredTranslationReducer';
import translateReducer from './translateReducer';
import userReducer from './userReducer';
import wordReducer from './wordReducer';
import contactUsReducer from './contactUsReducer';

const init = {
  lastSearchCriteria: {},
  searchResult: {
    items: [],
    total_items: 0
  },
  current: {},
  all: []
};

const combined = combineReducers({
  toastr: toastrReducer,
  message: messageReducer,
  auth: authReducer,
  app: appReducer,
  appSetting: reduceReducers(
    init,
    createReducerWithNamedType('APP_SETTING'),
    appSettingReducer
  ),
  donor: reduceReducers(
    init,
    createReducerWithNamedType('DONOR'),
    donorReducer
  ),
  donation: reduceReducers(
    init,
    createReducerWithNamedType('DONATION'),
    donationReducer
  ),
  word: reduceReducers(
    { ...init, suggestionWords: [] },
    createReducerWithNamedType('WORD'),
    wordReducer
  ),
  status: reduceReducers(
    init,
    createReducerWithNamedType('STATUS'),
    statusReducer
  ),
  translation: reduceReducers(
    init,
    createReducerWithNamedType('TRANSLATION'),
    translationReducer
  ),
  starredTranslation: reduceReducers(
    { ...init, active: [] },
    createReducerWithNamedType('STARRED_TRANSLATION'),
    starredTranslationReducer
  ),
  translate: translateReducer,
  user: reduceReducers(init, createReducerWithNamedType('USER'), userReducer),
  language: reduceReducers(
    init,
    createReducerWithNamedType('LANGUAGE'),
    languageReducer
  ),
  role: reduceReducers(init, createReducerWithNamedType('ROLE'), roleReducer),
  wordType: reduceReducers(
    init,
    createReducerWithNamedType('WORD_TYPE'),
    wordTypeReducer
  ),
  contactUs: reduceReducers(
    init,
    createReducerWithNamedType('CONTACT_US'),
    contactUsReducer
  )
});

export default reduceReducers({}, combined);
