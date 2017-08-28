import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import nock from 'nock';

import * as actions from '../app/actions';
import requestService from '../app/request_service';

const mockStore = configureMockStore([requestService]);

describe('async actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      worldPopulation: 0,
      usaPopulation: 0,
      loadingShortList: false,
      loadingUserRank: false,
      shortCountries: undefined,
      userInfo: {
        dateOfBirth: '1981-01-01',
        gender: 'female'
      }
    });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('FETCH_POP: should fetch population for a given country', () => {
    let country = 'World';
    let date = new Date();
    let formattedDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    nock('http://api.population.io:80')
      .get('/1.0/population/World/'+formattedDate+'/')
      .reply(200, {
        'total_population': {
          'date': '2015-12-24',
          'population': 208679204
        }
      });

    let expectedActions = [
      { type: 'FETCH_POP' , country: country},
      { type: 'RECEIVE_POP', country: country, population: 208679204 }
    ];

    return store.dispatch(actions.fetchPop(country)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('FETCH_SHORT_COUNTRIES: should fetch list of shortest countries', () => {
    nock('http://api.population.io:80')
      .get('/1.0/population/2017/aged/18/')
      .reply(200, [  
        {
          'females': 128443,
          'country': 'Cuba',
          'age': 18,
          'males': 134463,
          'year': 1980,
          'total': 262906
        },
        {
          'females': 4742534,
          'country': 'Fiji',
          'age': 18,
          'males': 4798708,
          'year': 1980,
          'total': 9541242
        },
        {
          'females': 29160,
          'country': 'Togo',
          'age': 18,
          'males': 30565,
          'year': 1980,
          'total': 59725
        },
      ]
      );

    let expectedActions = [
      { type: 'FETCH_SHORT_COUNTRIES'},
      { type: 'RECEIVED_SHORT_COUNTRIES', data: {'Cuba':{}, 'Fiji':{}, 'Togo':{}}}
    ];

    return store.dispatch(actions.fetchShortCountries()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});