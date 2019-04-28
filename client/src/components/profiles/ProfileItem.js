import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../utils/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-6">
          <h3>{profile.username}</h3>
          </div>
          <div className="col-10 col-md-4 col-8">
            
            <Link to={`/profile/${profile.username}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
          
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;