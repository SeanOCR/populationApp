import React from 'react';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as actions from '../actions';

import 'react-datepicker/dist/react-datepicker.css';

export default class UserRanking extends React.Component {
  constructor(props) {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);
    this.onGenderSelection = this.onGenderSelection.bind(this);
    this.onFetchClick = this.onFetchClick.bind(this);
  }

  onDateChange(date) {
    this.props.onDateChange(date.format('YYYY-MM-DD'));
  }

  onGenderSelection(gender) {
    this.props.onGenderSelection(gender.target.value)
  }

  onFetchClick() {
    this.props.onFetchClick();
  }

  render() {
    let dateOfBirth = this.props.userInfo.get('dateOfBirth');
    let gender = this.props.userInfo.get('gender');

    return (
      <div className='user-ranking'>
        <div className='section-header'>
          <h2>Check Your Ranking</h2>
          <div className='section-subtext'>Enter your information to check where you rank</div>
        </div>
        <div className='user-ranking-form-container'>
          <div className='user-date-picker'>
            <div className='user-form-label'>Date of Birth:</div>
            <DatePicker
              selected={dateOfBirth !== '' ?  moment(dateOfBirth) : moment()}
              onChange={this.onDateChange}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
            />
          </div>
          <div>
            <span className='user-form-label'>Gender:</span>
            <select value={gender} className='user-gender-selection' name='Gender' onChange={this.onGenderSelection}>
              <option value='female'>Female</option>
              <option value='male'>Male</option>
            </select>
          </div>
        </div>
        <button className='user-button' disabled={this.props.loadingUserRank} onClick={this.onFetchClick}>
          {this.props.loadingShortList ? <i className='fa fa-spinner fa-spin'></i> : null}
          Fetch
        </button>

        {this.props.userRank
          ? <div className='user-rank'> 
              <div>
                <div>DOB: {this.props.userRank.dob}</div>
                <div>Gender: {this.props.userRank.sex}</div>
              </div>
              <div>
                <div>Your Rank In The World</div>
                <div>You are ranked: {this.props.userRank.rank}</div>
              </div>
            </div>
          : null 
        }
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onDateChange: (date) => dispatch(actions.setUserDOB(date)),
        onGenderSelection: (gender) => dispatch(actions.setUserGender(gender)),
        onFetchClick: () => dispatch(actions.fetchUserRank())
    };
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.get('userInfo'),
    userRank: state.get('userRank'),
    loadingUserRank: state.get('loadingUserRank')
  }
}

export const UserRankingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRanking);
