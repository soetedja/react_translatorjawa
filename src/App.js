import React, { Component } from "react";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import { HashRouter, Route, Switch } from "react-router-dom";

import {
  refreshToken,
  setCurrentUser,
  signInAsGuest
} from "./actions/authActions";
import { getLanguages } from "./actions/languageActions";
import { getSavedTranslation } from "./actions/starredTranslationActions";
import { getStatuses } from "./actions/statusActions";
import AccessControl from "./components/AccessControl";
import { GUEST_USER_ID, REFRESH_TOKEN_BEFORE } from "./constants";
import store from "./store";
// import { renderRoutes } from 'react-router-config';
import setAuthToken from "./utils/setAuthToken";

import "./App.scss";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));
const TranslateLayout = React.lazy(() =>
  import("./containers/TranslateLayout/TranslateLayout")
);

// Pages
const Login = React.lazy(() => import("./views/Pages/Login"));
const Register = React.lazy(() => import("./views/Pages/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));
// const Translate = React.lazy(() => import('./views/Translate/Translate'));

// Check for token
if (localStorage.jwtToken && localStorage.jwtToken !== "undefined") {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Set user and isAuthenticated
  var user = JSON.parse(localStorage.user);
  store.dispatch(setCurrentUser(user));
  let expire_in = localStorage.expiry_time - REFRESH_TOKEN_BEFORE * 60;
  var utcSeconds = expire_in;
  var d = new Date(0);
  d.setUTCSeconds(utcSeconds);

  const timeout = d - new Date();

  if (GUEST_USER_ID !== user.id) {
    if (timeout < 0) {
      store.dispatch(refreshToken(localStorage.refresh_token));
    } else {
      setTimeout(() => {
        store.dispatch(signInAsGuest());
      }, timeout);
    }
    store.dispatch(getSavedTranslation());
  }
} else {
  store.dispatch(signInAsGuest());
  // window.location.href = '/#/translate';
}

store.dispatch(getLanguages());
store.dispatch(getStatuses());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={props => <Login {...props} />}
              />
              <Route
                exact
                path="/register"
                name="Register Page"
                render={props => <Register {...props} />}
              />
              <Route
                exact
                path="/404"
                name="Page 404"
                render={props => <Page404 {...props} />}
              />
              <Route
                exact
                path="/500"
                name="Page 500"
                render={props => <Page500 {...props} />}
              />
              <Route
                exact
                path="/translate"
                name="Translate"
                render={props => <TranslateLayout {...props} />}
              />
              <Route
                exact
                path="/about-translator"
                name="AboutTranslator"
                render={props => <TranslateLayout {...props} />}
              />
              <Route
                exact
                path="/privacy-and-terms"
                name="PrivacyAndTerms"
                render={props => <TranslateLayout {...props} />}
              />
              <Route
                exact
                path="/contact-us"
                name="ContactUs"
                render={props => <TranslateLayout {...props} />}
              />
              <Route
                exact
                path="/thanks"
                name="Thanks"
                render={props => <TranslateLayout {...props} />}
              />
              <Route
                exact
                path="/about-mongosilakan"
                name="AboutMongosilakan"
                render={props => <TranslateLayout {...props} />}
              />
              <Route
                path="/"
                name="Home"
                render={props => <DefaultLayout {...props} />}
              />
            </Switch>
            <AccessControl />
          </React.Suspense>
        </HashRouter>
        <ReduxToastr
          timeOut={5000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="bounceIn"
          transitionOut="bounceOut"
          progressBar
          closeOnToastrClick
        />
      </Provider>
    );
  }
}

export default App;
