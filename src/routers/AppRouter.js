import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import Result from '../components/Result';
import Genres from '../components/Genres';
import AboutMovie from '../components/AboutMovie';
import AboutActor from '../components/AboutActor';
import PageNotFound from '../components/PageNotFound';

export default () => (
    <BrowserRouter>
       <React.Fragment>
         <Header />
         <Switch>
           <Route path="/" component={Result} exact />
           <Route path="/movie-:movieid" component={AboutMovie} />
           <Route path="/actor-:actorid" component={AboutActor} />
           <Route path="/genres" component={Genres} exact />
           <Route path="/genres/:genre" component={Result} />
           <Route component={PageNotFound} />
         </Switch>
       </React.Fragment>
    </BrowserRouter>
);