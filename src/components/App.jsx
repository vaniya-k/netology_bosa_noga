import React from 'react';
import NotFound from './NotFound';
import About from './About';
import Contacts from './Contacts';
import TopSales from './TopSales';
import Catalog from './Catalog';
import PageContainer from './PageContainer';
import ItemDetails from './ItemDetails';
import {Router, Route, Switch} from 'react-router-dom';
import history from '../utils/history.js';
import SearchContextProvider from '../utils/contexts/SearchContextProvider';

const App = () => {
  return (
    <SearchContextProvider>
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
          <Route
            exact path="/items/:routeId"
            render={(props) => {
                return (
                  <PageContainer>
                    <ItemDetails id={props.match.params.routeId}/>
                  </PageContainer>
                )
              }
            }
          />
          <Route>
            <PageContainer>
              <NotFound/>
            </PageContainer>
          </Route>
        </Switch>
      </Router>
    </SearchContextProvider>
  );
};

export default App;
