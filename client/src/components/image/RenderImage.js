import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./Image.css";

export default class RenderImage extends Component {
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
          <span className="w-50 float-right text-right">
            <button
              className="btn btn-sm btn-danger"
              onClick={this.onChildDelete}
            >
              {" "}
              <i className="fas fa-times" />
            </button>
          </span>
        </div>
      </div>
    );
  }
}
