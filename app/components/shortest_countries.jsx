import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import PopulationHighlight from './population_highlight';
import ShortCountryItem from './short_country_item';

export default class ShortCountries extends React.Component {
  constructor(props) {
    super(props);
    this.onFetchClick = this.onFetchClick.bind(this);
  }

  onFetchClick(e) {
    this.props.onFetchClick();
  }

  onCountryClick(country) {
    this.props.onCountryClick(country);
  }

  render() {
    let countriesList;
    let popTotal = 0,countriesTotal = 0;

    // Create fetched short named countries
    if(this.props.shortCountries) {
      const [...countryKeys] = this.props.shortCountries.keys();
      countriesList = [];
      for(let i = 0; i < countryKeys.length; i++) {
        let key = countryKeys[i];
        let countryData = this.props.shortCountries.get(key);
        // If this was being utilized anywhere else I'd store it in our redux store
        if(countryData.total) {
          countriesTotal++;
          popTotal = popTotal + (this.props.shortCountries.get(key).total ? this.props.shortCountries.get(key).total : 0);           
        }

        countriesList.push(
          <div className='short-country-container' key={key} onClick={() => this.onCountryClick(key)}>
            <ShortCountryItem key={key} country={key} data={countryData} />
          </div>
        );
      }
    }

    return (
      <div className='short-countries'>
        <div className='section-header'>
          <h2>Shortest Country Names</h2>
          <div className='section-subtext'>Populations of Countries with shortest names</div>
          {countriesList 
            ? <span>
                <div className='short-countries-subheader'>
                  <div className='short-countries-pop-total'><b>Total Population of Countries:</b> {popTotal} </div>
                  <div className='short-countries-total'><b>Number of Countries:</b> {countriesTotal} </div>
                </div>
                {countriesList}
              </span>
            : <button disabled={this.props.loadingShortList} onClick={this.onFetchClick}>
                {this.props.loadingShortList ? <i className='fa fa-spinner fa-spin'></i> : null}
                  Fetch
              </button> 
          }
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    loadingShortList: state.get('loadingShortList'),
    shortCountries: state.get('shortCountries')
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
      onFetchClick: () => dispatch(actions.fetchShortCountries()),
      onCountryClick: (country) => dispatch(actions.fetchShortCountryData(country))
  };
}

export const ShortCountriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortCountries);