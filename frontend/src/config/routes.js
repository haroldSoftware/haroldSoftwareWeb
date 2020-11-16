import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Home from '../components/Home/Home';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import About from '../components/About/About';
import ProfileContainer from '../containers/ProfileContainer';

export default withRouter(({ setCurrentUser, currentUser, history }) => {


  const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
      currentUser
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  );

  console.log("Routes ">>>currentUser)

  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' render={() => <Login history={history} setCurrentUser={setCurrentUser} />} />
      <Route path='/register' component={Register} />
      <Route path='/about' component={About} />
      {/* <PrivateRoute path='/profile' component={ProfileContainer} user={currentUser} /> */}
      <ProfileContainer path='/profile' user={currentUser} />
    </Switch>
  );
});
