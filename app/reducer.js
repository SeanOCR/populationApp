import {Map} from 'immutable';

export default function(state = Map(), action) {
  switch (action.type) {
    case 'FETCH_SHORT_COUNTRIES':
      return state.set('loadingShortList', true);
    case 'RECEIVED_SHORT_COUNTRIES':
      return state.set('shortCountries', Map(action.data)).set('loadingShortList', false);
    case 'RECEIVED_SHORT_COUNTRY_DATA':
      return state.setIn(['shortCountries', action.country], action.data);
    case 'RECEIVE_POP':
      if(action.country === 'United States') {
        return state.set('usaPopulation', action.population);
      } else if (action.country === 'World') {
        return state.set('worldPopulation', action.population);
      }
      return state;
    case 'USER_DATE_OF_BIRTH':
      return state.setIn(['userInfo', 'dateOfBirth'], action.dateOfBirth);
    case 'USER_GENDER':
      return state.setIn(['userInfo', 'gender'], action.gender);
    case 'FETCH_USER_RANK':
      return state.set('loadingUserRank', true);
    case 'RECEIVED_USER_RANK':
      return state.set('userRank', action.data).set('loadingUserRank', false);
    case 'REQUEST_ERROR':
      return state.set('loadingShortList', false).set('loadingUserRank', false);
    default:
      return state;
  }
}