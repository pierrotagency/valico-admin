import React, { useEffect } from 'react';
import Layout from './components/Layout/';
import { withRouter, Route, Switch, BrowserRouter as Router, Redirect, useLocation } from 'react-router-dom';

import routes from './routes';
import './App.scss';

import { isUserAuthenticated } from './helpers/auth';

//Fake backend
// import fakeBackend from './helpers/fakeBackend';
// fakeBackend();

function withLayout(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    render() {
      return <Layout>
        <WrappedComponent></WrappedComponent>
      </Layout>
    }
  };
}


function App() {

  let location = useLocation()

  useEffect(
    () => {
      // ga.send(['pageview', location.pathname])
      // console.log('pageview: ', location.pathname)
    },
    [location]
  )

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isUserAuthenticated() === true
        ? <Component {...props} />
        : <Redirect to='/logout' />
    )} />
  )

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {routes.map((route, idx) =>
            route.ispublic ?
              <Route path={route.path} component={withLayout(route.component)} key={idx} />
              :
              <PrivateRoute path={route.path} component={withLayout(route.component)} key={idx} />
          )}
        </Switch>
      </Router>
    </React.Fragment>
  );

}

export default withRouter(App);