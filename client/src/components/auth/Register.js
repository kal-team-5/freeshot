import React, { Component } from 'react';
import classname from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Register extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      username: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  render() {
    const {errors} = this.state;
    
    return (
      <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Freeshot account</p>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <input type="text" className={classname('form-control form-control-lg', {
                  'is-invalid':errors.name
                })} placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} required />
                {errors.name && (
                  <div className="invalid-feedback">
                    {errors.name}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input type="text" className={classname('form-control form-control-lg', {
                  'is-invalid':errors.username
                })} placeholder="Username" name="username" value={this.state.username} onChange={this.onChange} required />
                {errors.username && (
                  <div className="invalid-feedback">
                    {errors.username}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input type="password" className={classname('form-control form-control-lg', {
                  'is-invalid':errors.password
                })} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input type="password" className={classname('form-control form-control-lg', {
                  'is-invalid':errors.password2
                })} placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange} />
                {errors.password2 && (
                  <div className="invalid-feedback">
                    {errors.password2}
                  </div>
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
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStatetoProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStatetoProps, {registerUser})(withRouter(Register));