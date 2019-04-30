import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount
} from "../../actions/dashboardActions";
import Spinner from "../common/Spinner";
//import DashboardActions from './ProfileActions';
import Followers from "./Followers";
import Following from "./Following";
import DisplayUserUploads from "../image/DisplayUserUploads";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile(); //firing action
    /*setTimeout(
        function() {
          this.props.getCurrentProfile();
        }
        .bind(this),
        3000
    );*/
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    //console.log("profile" + this.props.profile.profile);
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <div className="container">
              <div className="row">
                <div className="lead text-muted col-mb-2">
                  Welcome {user.username}
                </div>
                <div className="btn-group  col-mb-4" role="group">
                  <Link to="/edit-profile" className="btn btn-light">
                    <i className="fas fa-user-circle text-info mr-1" /> Edit
                    Profile
                  </Link>
                  <Link to="/image-upload" className="btn btn-md btn-info">
                    Upload Image
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-mb-2">
                  <Followers followers={profile.followers} />
                </div>
                <div className="col-mb-4">
                  <Following following={profile.following} />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "60px" }} />
            <p className="lead text-muted">{user.name}</p>
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
          <br />

          <div className="row">
            <DisplayUserUploads username={user.username} />
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
