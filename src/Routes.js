import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from './components/Login/LoginForm';
import SignupForm from './components/Signup/SignupForm';
import AnimeList from './components/Anime/AnimeList';

function Routes({ login, register, token }) {
  const Homepage = () => {
    return (
      <div>
        <h1>Welcome to recordbook</h1>
      </div>
    )
  }
  return (
    <div>
      <Switch>
        <Route exact path="/">
          { token ? <Homepage/> : <LoginForm/> }
        </Route>
        <Route exact path="/login">
          <LoginForm login={login}/>
        </Route>
        <Route exact path="/signup">
          <SignupForm register={register}/>
        </Route>
        <Route exact path="/top_anime">
          <AnimeList/>
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;