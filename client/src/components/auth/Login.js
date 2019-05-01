import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

 class Login extends Component {
    constructor(){
        super();
        this.state={
          
          username:'',
          password:'',
          errors:{}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
   
     onChange(e){
       this.setState({[e.target.name]:e.target.value});
     }
   
    onSubmit(e){
      e.preventDefault();
      const user = {
       
       username : this.state.username,
        password : this.state.password
        
      };
      this.props.loginUser(user);
    }  
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
          this.props.history.push('/dashboard');
        }
      }
     
      componentWillReceiveProps(nextProps){  //new set of props
       if (nextProps.auth.isAuthenticated){
          this.props.history.push('/dashboard');
        }
      
       if (nextProps.errors){
          this.setState({errors:nextProps.errors});
       }
     }
  render() {
    //console.log(this.props);
    const {errors} = this.state; 
    console.log(this.props.errors);
     //value from store (errors = this.state.errors)
     const {user} = this.props.auth //value from store  (user = this.props.auth)

    return (
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your Freeshot account</p>
                <form noValidate onSubmit={this.onSubmit}>
                  
                  <div className="form-group">
                    <input type="text" className={classnames('form-control form-control-lg',{'is-invalid':errors.username})} placeholder="Username" name="username" value={this.state.username} onChange={this.onChange} />
                    {errors.username && (<div className="invalid-feedback">
                         {errors.username} </div>
                       )}
                  </div>
                  <div className="form-group">
                    <input type="password" className={classnames('form-control form-control-lg',{'is-invalid':errors.password})} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
                      {errors.password && (<div className="invalid-feedback">
                         {errors.password} </div>
                       )}
                  
                  </div>
                  <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
          )
        }
      }
   

      Login.propTypes = {
        loginUser:PropTypes.func.isRequired,
         auth:PropTypes.object.isRequired,
         errors:PropTypes.object.isRequired
       }
       
       const mapStateToProps = (state)  => ({
          auth: state.auth,
          errors:state.errors
       
       
       });
        export default connect(mapStateToProps, {loginUser})(Login);
       