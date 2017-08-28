import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Map} from 'immutable';
import reducer from './reducer';
import Banner from './components/banner';
import {PopulationHeaderContainer} from './components/population_header';
import {ShortCountriesContainer} from './components/shortest_countries';
import {UserRankingContainer} from './components/user_ranking';


import * as actions from './actions';
import requestService from './request_service'

require('./style.css');

// Not necessary to defined the undefines, but for our init
// state I think it's a good idea to see what is included in the store
// as it's populated
var initState =  Map({
  worldPopulation: 0,
  usaPopulation: 0,
  loadingShortList: false,
  loadingUserRank: false,
  shortCountries: undefined,
  userInfo: Map({
    dateOfBirth: '1981-01-01',
    gender: 'female'
  })
});

const store = createStore(reducer, initState, applyMiddleware(requestService));
store.dispatch(actions.fetchPop('World'));
store.dispatch(actions.fetchPop('United States'));

function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <div className='app-container'>
        <Banner />
        <PopulationHeaderContainer/>
        <ShortCountriesContainer />
        <UserRankingContainer />
      </div>
    </Provider>,
    document.getElementById('app')
  );
}

renderApp();