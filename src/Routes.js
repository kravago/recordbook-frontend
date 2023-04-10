import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function Routes({ login, register, token }) {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <div>
            <h1>Welcome to recordbook</h1>
          </div>
        </Route>
        <Route exact path="/login">
          <LoginForm login={login}/>
        </Route>
        <Route exact path="/signup">
          <SignupForm register={register}/>
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;