import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';

import { editProfile, getCurrentProfile } from '../../actions/dashboardActions';
import isEmpty from '../../utils/is-empty';



 class EditProfile extends Component {
    constructor(){
        super();
        this.state={
          name:'',
          gender:'',
          email:'',  
          bio:'',
          phone:'',
          website:'',
          social:'',
          errors:{}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }

      componentDidMount(){
        this.props.getCurrentProfile();
      }


      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
    
        if (nextProps.profile.profile) {
          const profile = nextProps.profile.profile;
    
         
          // If profile field doesnt exist, make empty string
          profile.name = !isEmpty(profile.name) ? profile.name : '';
          profile.gender = !isEmpty(profile.gender) ? profile.gender : '';
          profile.email = !isEmpty(profile.email) ? profile.email : '';
          profile.phone = !isEmpty(profile.phone) ? profile.phone : '';
          profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
          profile.social = !isEmpty(profile.social) ? profile.social : {};
          profile.twitter = !isEmpty(profile.social.twitter)
            ? profile.social.twitter
            : '';
          profile.facebook = !isEmpty(profile.social.facebook)
            ? profile.social.facebook
            : '';
          profile.linkedin = !isEmpty(profile.social.linkedin)
            ? profile.social.linkedin
            : '';
          profile.youtube = !isEmpty(profile.social.youtube)
            ? profile.social.youtube
            : '';
          profile.instagram = !isEmpty(profile.social.instagram)
            ? profile.social.instagram
            : '';
    
          // Set component fields state
          this.setState({
            name:profile.name,
            gender:profile.gender,
            email:profile.email,
            phone:profile.phone,
            website: profile.website,
             bio: profile.bio,
            twitter: profile.twitter,
            facebook: profile.facebook,
            linkedin: profile.linkedin,
            youtube: profile.youtube,
            instagram: profile.instagram
          });
        }
      }
     onChange(e){
       this.setState({[e.target.name]:e.target.value});
     }
   
    onSubmit(e){
      e.preventDefault();
      const profileData = {
            name:this.state.name,
            gender:this.state.gender,
            email:this.state.email,
            phone:this.state.phone,
            website: this.state.website,
            bio: this.state.bio,
            twitter:this.state.twitter,
            facebook:this.state.facebook,
            linkedin:this.state.linkedin,
            youtube: this.state.youtube,
            instagram:this.state.instagram
        
      };
      this.props.editProfile(profileData, this.props.history);
    }  
    
     
     
  
    render() {
        const { errors, displaySocialInputs } = this.state;
    
        let socialInputs;
    
        if (displaySocialInputs) {
          socialInputs = (
            <div>
              <InputGroup
                placeholder="Twitter Profile URL"
                name="twitter"
                icon="fab fa-twitter"
                value={this.state.twitter}
                onChange={this.onChange}
                error={errors.twitter}
              />
    
              <InputGroup
                placeholder="Facebook Page URL"
                name="facebook"
                icon="fab fa-facebook"
                value={this.state.facebook}
                onChange={this.onChange}
                error={errors.facebook}
              />
    
              <InputGroup
                placeholder="Linkedin Profile URL"
                name="linkedin"
                icon="fab fa-linkedin"
                value={this.state.linkedin}
                onChange={this.onChange}
                error={errors.linkedin}
              />
    
              <InputGroup
                placeholder="YouTube Channel URL"
                name="youtube"
                icon="fab fa-youtube"
                value={this.state.youtube}
                onChange={this.onChange}
                error={errors.youtube}
              />
    
              <InputGroup
                placeholder="Instagram Page URL"
                name="instagram"
                icon="fab fa-instagram"
                value={this.state.instagram}
                onChange={this.onChange}
                error={errors.instagram}
              />
            </div>
          );
        }
        return (
            <div className="edit-profile">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <Link to="/dashboard" className="btn btn-light">
                      Go Back
                    </Link>
                    <h1 className="display-4 text-center">Edit Profile</h1>
                    
                    <form onSubmit={this.onSubmit}>
                    Name <TextFieldGroup
                        placeholder="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        error={errors.name}
                        
                      />   
                      
                     Email <TextFieldGroup
                        placeholder="Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                        
                      />   
                   Phone <TextFieldGroup
                  placeholder="Phone No."
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  error={errors.phone}
                 
                />
                Website<TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  
                />
                Gender<TextFieldGroup
                  placeholder="Gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  error={errors.gender}
                  
                />
                
               Bio <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { editProfile, getCurrentProfile })(
  withRouter(EditProfile)
); 
   

      
       
