import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./Image.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class RenderImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {} //Holds HTTP 400/500 errors
    };
    this.onChildDelete = this.onChildDelete.bind(this);
  }

  //OnImage delete
  onChildDelete(e) {
    e.preventDefault();
    this.props.deleteAction(this.props.data._id);
  }

  //ReactApi to handle exceptions
  componentDidCatch(error, info) {
    if (error && error.length > 0) {
      this.setState({
        errors: error.response.data.text //exception message inside errors.text. errors{}=error.response.data
      });
    }
  }

  render() {
    const image = this.props.data;
    const error = this.state.errors;
    const loggedInUser = this.props.auth.user.username;
    //console.log("User name in auth object: " + this.props.auth.user.username);
    return (
      <div style={{ margin: "5px" }}>
        <div className="cardLayout">
          <div key={image._id} className="card">
            <Link to={`/add-comments/${image._id}`}>
              <img
                className="img-responsive img-thumbnail"
                src={image.url}
                alt={image.caption}
              />
            </Link>
          </div>
          <p className="w-50 float-left">
            <b>{image.caption}</b>
          </p>
          {image.username === loggedInUser ? (
            <span className="w-50 float-right text-right">
              <button
                className="btn btn-sm btn-danger"
                onClick={this.onChildDelete}
              >
                {" "}
                <i className="fas fa-times" />
              </button>
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}

RenderImage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = reduxState => ({
  auth: reduxState.auth
});

export default connect(mapStateToProps)(RenderImage);
