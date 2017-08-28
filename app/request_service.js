import request from 'superagent';
import * as actions from './actions';

const _ = require('underscore');

const URL_TOTAL_POPULATION = 'http://api.population.io:80/1.0/population/@country/@date/';
const URL_COUNTRY_DATA = 'http://api.population.io:80/1.0/population/@year/@country/';
const URL_USER_RANK = 'http://api.population.io:80/1.0/wp-rank/@dob/@gender/World/today/';

const requestService = ({ getState }) => next => action => { 
  next(action);
  switch (action.type) {
    case 'FETCH_POP': {
      let date = new Date();
      let formattedDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
      let url = URL_TOTAL_POPULATION.replace('@country', action.country).replace('@date',formattedDate);
      return request.get(url).then((body) => {
        const data = JSON.parse(body.text);
        next(actions.receivedPop(action.country, data.total_population.population));
      }).catch((err) => {
        next(actions.requestError(err));
      });
    }
    case 'FETCH_SHORT_COUNTRIES':
      // I'd prefer to hit up the countries endpoint, but it appears there are CORS issues
      return request.get('http://api.population.io:80/1.0/population/2017/aged/18/').then((body) => {
        const data = JSON.parse(body.text);
        let sortedList = _.sortBy(data, (entry) => {
          return entry.country.length;
        });
        let shortestLength = sortedList[0].country.length;
        let shortCountries = {};
        // Coud use  map, forEach, _ but that would cause needless iterations
        for(let i = 0; i < sortedList.length; i++) {
          if(sortedList[i].country.length === shortestLength) {
            shortCountries[sortedList[i].country] = {};
          } else {
            break;
          }
        }
        next(actions.receivedShortCountries(shortCountries));
      }).catch((err) => {
        next(actions.requestError(err));
      });
    case 'FETCH_SHORT_COUNTRY_DATA': {
      let url = URL_COUNTRY_DATA.replace('@year', '2017').replace('@country', action.country);
      return request.get(url).then((body) => {
        const data = JSON.parse(body.text);
        var countryData = _.reduce(data, (memo, entry) => {
          return {total: memo.total+entry.total, females: memo.females+entry.females, males: memo.males+entry.males };
        }, {total: 0, females: 0, males: 0, });

        next(actions.receivedShortCountryData(action.country, countryData));
      }).catch((err) => {
        next(actions.requestError(err));
      });
    }
    case 'FETCH_USER_RANK': {
      let url = URL_USER_RANK.replace('@dob', getState().getIn(['userInfo', 'dateOfBirth'])).replace('@gender', getState().getIn(['userInfo', 'gender']));
      return request.get(url).then((body) => {
        const data = JSON.parse(body.text);
        next(actions.receivedUserRank(data));
      }).catch((err) => {
        next(actions.requestError(err));
      });
    }
    default:
      break;
  }
};

export default requestService;