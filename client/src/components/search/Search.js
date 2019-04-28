import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { loginUser } from '../../actions/authActions';
//import classnames from 'classnames';

 class Search extends Component {
    constructor(){
        super();
        this.state={
          search:""
     };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
   
     onChange(e){
       this.setState({search:e.target.value});
     }
   
    onSubmit(e){
      e.preventDefault();
    //  this.props.match.params.username=this.search;
    //  this.props.getProfileByHandle(this.props.match.params.username);
            
      
     // this.props.loginUser(user);
    }  

 /*  componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile === null && this.props.profile.loading) {
          this.props.history.push('/not-found');
        }
        else{
            
        }
        if (nextProps.errors){
          this.setState({errors:nextProps.errors});
        }
    } */

  render() {
   // const {errors} = this.state;  //value from store (errors = this.state.errors)
    // const {search} = this.props //value from store  (user = this.props.auth)

    return (
        <div className="search">
           <form noValidate onSubmit={this.onSubmit}>
                   <div className="input-group">
                    <input type="text" placeholder="Search" name="search" value={this.state.search} onChange={this.onChange} />
                    <div className="input-group-append">
                    <Link to={`/search/${this.state.search}`}>
                    <button type="submit" className="input-group-text bg-primary text-white">
                     <i className="fas fa-search"></i>
                    </button>  </Link>
                  </div>
                    
                  </div>
                  </form>
              </div>
            
          
          )
        }
      }

      export default Search;

    /*  Profile.propTypes = {
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
        
      });*/
    //  export default connect(mapStateToProps, { getProfileByHandle,addfollow,unfollow })(Search);


  //    Search.propTypes = {
  //      loginUser:PropTypes.func.isRequired,
  //       auth:PropTypes.object.isRequired,
  //       errors:PropTypes.object.isRequired
  //     }
       
   //    const mapStateToProps = (state)  => ({
   //       auth: state.auth,
   //       errors:state.errors
       
       
     //  });

       // export default connect(mapStateToProps, {loginUser})(Search);
       


    /*   <li className="nav-item">
         <a href="/profile/this.state.search">
          <input type="text" placeholder="Search" icon="search" name="search" onChange={this.onChange.bind(this)} 
          value={this.state.search} />
          
          </a>
        </li>*/