
// Technically these are action creators and not actions themselves...
export function fetchPop(country) {
  return {
    type: 'FETCH_POP',
    country
  };
}

export function receivedPop(country, population) {
  return {
    type: 'RECEIVE_POP',
    country,
    population
  };
}

export function fetchShortCountries() {
  return {
    type: 'FETCH_SHORT_COUNTRIES'
  };
}

export function receivedShortCountries(data) {
  return {
    type: 'RECEIVED_SHORT_COUNTRIES',
    data
  };
}

export function fetchShortCountryData(country) {
  return {
    type: 'FETCH_SHORT_COUNTRY_DATA',
    country
  };
}


export function receivedShortCountryData(country, data) {
  return {
    type: 'RECEIVED_SHORT_COUNTRY_DATA',
    country,
    data
  };
}

export function requestError(error) {
  return {
    type: 'REQUEST_ERROR',
    error
  };
}

export function setUserDOB(dateOfBirth) {
  return {
    type: 'USER_DATE_OF_BIRTH',
    dateOfBirth
  }; 
}

export function setUserGender(gender) {
  return {
    type: 'USER_GENDER',
    gender
  }; 
}

export function fetchUserRank(gender) {
  return {
    type: 'FETCH_USER_RANK'
  }; 
}

export function receivedUserRank(data) {
  return {
    type: 'RECEIVED_USER_RANK',
    data
  }; 
}