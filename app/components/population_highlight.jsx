import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

export default class PopulationHighlight extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {    
    return (
      <div className='population-highlight'>
        <div className="population-highlight-title">
          <h2>{this.props.title}</h2>
        </div>
        <div className="inverted">
         As of Today
        </div>
        <div className="inverted">
          {this.props.population}
        </div>
      </div>
    );
  }
};
