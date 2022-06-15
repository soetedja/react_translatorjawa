const APIs = {
  index: {
    authenticate: '/api/v2/authenticate/',
    googleAuth: '/api/v2/googleAuth/',
    signInAsGuest: '/api/v2/signInAsGuest/',
    logout: '/api/v2/logout/'
  },
  dashboard: {
    root: '/api/v2/dashboard/'
  },
  appSetting: {
    root: '/api/v2/appSetting/'
  },
  contactUs: {
    root: '/api/v2/contactUs/'
  },
  donation: {
    root: '/api/v2/donation/'
  },
  donor: {
    root: '/api/v2/donor/'
  },
  language: {
    root: '/api/v2/language/'
  },
  resource: {
    root: '/api/v2/resource/'
  },
  role: {
    root: '/api/v2/role/'
  },
  status: {
    root: '/api/v2/status/'
  },
  translate: {
    root: '/api/v2/translate/'
  },
  translation: {
    root: '/api/v2/translation/',
    createByWord: '/api/v2/translation/createByWord/',
    updateByDetails: '/api/v2/translation/updateByDetails/'
  },
  user: {
    root: '/api/v2/user/',
    refreshToken: '/api/v2/user/refreshToken'
  },
  word: {
    root: '/api/v2/word/'
  },
  wordType: {
    root: '/api/v2/wordType/'
  },
  starredTranslation: {
    root: '/api/v2/starredTranslation/'
  }
};
export default APIs;
