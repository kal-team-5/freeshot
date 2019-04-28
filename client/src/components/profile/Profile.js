import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getProfileByHandle,addfollow,unfollow,clearCurrentProfile } from '../../actions/dashboardActions';

class Profile extends Component {

  
  onFollowClick(id,name,username) {
    this.props.addfollow(id,name,username);
    window.location.reload();
    }

    onDeleteClick(id) {
      
          this.props.unfollow(id);
          window.location.reload();
    }

  componentDidMount() {
    if (this.props.match.params.username) {
      this.props.getProfileByHandle(this.props.match.params.username);
     
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
    if (nextProps.errors){
      this.setState({errors:nextProps.errors});
    // alert(JSON.stringify(nextProps.errors));
     
       
   }
    
  }

  render() {
    const {auth} = this.props ;
    
    const { profile, loading} = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      if (!(profile.user === auth.user.id)){
      profileContent = (
        <div>
          <p>
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
            </Link>
          </p>
          <div className="row">
              <div className="col-md-2">
                   <h3>{profile.username}</h3>
               </div>
                <div className="col-md-6">
                  <h3>{profile.name}</h3>
               </div>
               <div className="col-md-2">
              {  (profile.followers.filter(followers => followers.user.toString() === auth.user.id).length==0 ) ?
                (<button  type="button"
                onClick={this.onFollowClick.bind(this, profile.user,profile.name,profile.username)}
                
                className="btn-group btn btn-light" >Follow
             </button>)
            : (<button type="button"
                  onClick={this.onDeleteClick.bind(this, profile.user)}
                   className="btn-group btn btn-light" >Following
             </button>) 
              }
             </div>
          </div> 
        </div>
      );
    }
  
  else{
    profileContent = (
      <div>
        <p>
          <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back To Profiles
          </Link>
        </p>
        <div className="row">
            <div className="col-md-2">
                 <h3>{profile.username}</h3>
             </div>
              <div className="col-md-6">
                <h3>{profile.name}</h3>
             </div>
           </div>
    </div>  )  
  }
}
 

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  addfollow: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired,
  unfollow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors:state.errors
  
});

export default connect(mapStateToProps, { getProfileByHandle,addfollow,unfollow })(Profile);

