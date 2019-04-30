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

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile(); //firing action

  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {

    
    const {user}= this.props.auth;
    
    const {profile,loading}  = this.props.profile;

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {

        // Check if logged in user has profile data
        if(Object.keys(profile).length>0){
            dashboardContent = (
                <div>
                 <div className="container">
                 <div className="row">
                 <img src={profile.user.avatar} alt="" className="rounded-circle" />
                  <div className="lead text-muted col-2">Welcome {user.username}</div>
                     <div className="btn" >
                      <Link to="/edit-profile" className="btn btn-light">
                        <i className="fas fa-user-circle " /> Edit Profile
                      </Link>
                      </div>
                    </div>  
                    <div className="row">
                        <div className="col-2">
                          <Followers followers={profile.followers} />
                          <span style={{  marginLeft: '25px' }}>{profile.followers.length}</span> 
                         </div>
                         <div className="col-4">
                          <Following following={profile.following} /> 
                          <span style={{  marginLeft: '25px' }}>{profile.following.length}</span> 
                         </div>
                         <div>
                           <Link to="/image-upload" className="btn btn-md btn-info">
                               Upload Image
                            </Link>
                           </div>
                        </div> 
                   </div>
                  
                   
                  <div style={{ marginBottom: '60px' }} />
                      <p className="lead text-muted">{user.name}</p>
                      <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
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
