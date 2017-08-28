import React from 'react';

export default class ShortCountryItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let classes = 'short-country-item' + (this.props.data.total ? ' disabled': '');

    return (
      <div className={classes}> 
        <div className='short-country-column1'>
          <h2>{this.props.country}</h2>
          {this.props.data.total ? <div>Total Population: {this.props.data.total}</div>  : null}
        </div>
        <div className='short-country-column2'>
          {this.props.data.males ? <div>Male Population: {this.props.data.males}</div>  : null}
          {this.props.data.females ? <div>Female Population: {this.props.data.females}</div>  : null}
        </div>
      </div>
    );
  }
};
