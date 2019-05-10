import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import Result from '../components/Result';
import Genres from '../components/Genres';
import PageNotFound from '../components/PageNotFound';

export default () => (
    <BrowserRouter>
       <React.Fragment>
         <Header />
         <Switch>
           <Route path="/" component={Result} exact />
           <Route path="/genres" component={Genres} />
           <Route component={PageNotFound} />
         </Switch>
       </React.Fragment>
    </BrowserRouter>
);