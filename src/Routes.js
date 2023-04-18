import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from './components/Login/LoginForm';
import SignupForm from './components/Signup/SignupForm';
import AnimeList from './components/Anime/AnimeList';
import AnimeCard from './components/Anime/AnimeCard';

function Routes({ login, register, token }) {
  const Homepage = () => {
    return (
      <div>
        <h1>Welcome to recordbook</h1>
      </div>
    )
  }

  const sample_anime = {
    "anime_id": "1",
    "anime_title": "test_anime",
    "synopsis": "this is a test anime",
    "image": "none available",
    "start_date": "03-02-1992",
    "end_date": "04-01-1993",
    "rating": "8.2",
    "status": "finished"
  }

  return (
    <div>
      <Switch>
        <Route exact path="/">
          { token ? <AnimeCard anime={sample_anime} /> : <LoginForm login={login}/> }
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