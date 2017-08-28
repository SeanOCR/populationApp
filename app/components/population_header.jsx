import React from 'react';
import PopulationHighlight from './population_highlight';
import {connect} from 'react-redux';
import * as actions from '../actions';

export default class PopulationHeader extends React.Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
  }

  click(e) {
    this.props.onTabClick(e);
  }

  render() {    
    return (
      <div className='population-header'>
        <PopulationHighlight title="World Population" population={this.props.worldPopulation.toLocaleString()} />
        <PopulationHighlight title="USA Population" population={this.props.usaPopulation.toLocaleString()} />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    worldPopulation: state.get('worldPopulation'),
    usaPopulation: state.get('usaPopulation')
  }
}

export const PopulationHeaderContainer = connect(
  mapStateToProps
)(PopulationHeader);
