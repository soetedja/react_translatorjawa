import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav
} from '@coreui/react';
import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import * as router from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { logout } from '../../actions/authActions';
import navigation from '../../_translate_nav';
import routes from '../../_translate_routes';
import MessageHandler from '../../components/MessageHandler';

const TranslateAside = React.lazy(() => import('./TranslateAside'));
const TranslateFooter = React.lazy(() => import('./TranslateFooter'));
const TranslateHeader = React.lazy(() => import('./TranslateHeader'));

class TranslateLayout extends Component {
  loading = () => (
    <div className='animated fadeIn pt-1 text-center'>Loading...</div>
  );

  signOut(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className='app'>
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <TranslateHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className='app-body'>
          <AppSidebar fixed display='false'>
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={navigation}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className='main translate'>
            {/* <AppBreadcrumb appRoutes={routes} router={router} /> */}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  {/* <Redirect from='/translate' to='/translate' /> */}
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <TranslateAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <TranslateFooter />
          </Suspense>
        </AppFooter>
        <MessageHandler />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {
    logout
  }
)(TranslateLayout);
