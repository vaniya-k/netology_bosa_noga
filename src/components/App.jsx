import React from 'react';
import NotFound from './NotFound';
import About from './About';
import Contacts from './Contacts';
import TopSales from './TopSales';
import Catalog from './Catalog';
import PageContainer from './PageContainer';
import {Router, Route, Switch} from 'react-router-dom';
import history from '../utils/history.js';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <PageContainer currLink={`/`}>
            <TopSales/>
            <Catalog/>
          </PageContainer>
        </Route>
        <Route exact path="/about">
          <PageContainer currLink={`/about`}>
            <About/>
          </PageContainer>
        </Route>
        <Route exact path="/contacts">
          <PageContainer currLink={`/contacts`}>
            <Contacts/>
          </PageContainer>
        </Route>
        <Route exact path="/catalog">
          <PageContainer currLink={`/catalog`}>
            <Catalog showingSearchField={true}/>
          </PageContainer>
        </Route>
        <Route>
          <PageContainer>
            <NotFound/>
          </PageContainer>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
