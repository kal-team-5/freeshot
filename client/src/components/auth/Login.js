import React, { Component } from 'react';
import classnames from 'classnames';

 class Login extends Component {
    constructor(){
        super();
        this.state={
          name:'',
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
        email : this.state.email,
        password : this.state.password
        
      };
    }  
  render() {
    const {errors} = this.state;
    return (
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your Freeshot account</p>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input type="name" className={classnames('form-control form-control-lg',{'is-invalid':errors.name})} placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} />
                    {errors.name && (<div className="invalid-feedback">
                         {errors.name} </div>
                       )}
                  </div>
                  <div className="form-group">
                    <input type="name" className={classnames('form-control form-control-lg',{'is-invalid':errors.username})} placeholder="Username" name="username" value={this.state.email} onChange={this.onChange} />
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
   

export default Login;