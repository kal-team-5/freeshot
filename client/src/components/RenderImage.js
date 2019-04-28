import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./Image.css";

export default class RenderImage extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(imageId) {
    Axios.delete("freeshot/dashboard/image/" + imageId)
      .then(response => this.props.history.push("/all"))
      .catch(error => {
        this.componentDidCatch(error, "Delete image failed");
        console.log(error);
      });
  }

  //ReactApi to handle exceptions
  componentDidCatch(error, info) {
    if (error) {
      this.setState({
        errors: error.response.data
      });
    }
  }

  render() {
    const image = this.props.data;

    return (
      <div className="col-md-3 image cell">
        <div className="cardLayout">
          <div key={image._id} className="card">
            <Link to={`/add-comments/${image._id}`}>
              <img
                className="img-responsive"
                src={image.url}
                alt={image.caption}
              />
            </Link>
          </div>
          <p className="w-50 float-left"><b>{image.caption}</b></p>
          <span className="w-50 float-right text-right">
            <button
              className="btn btn-sm btn-danger"
              onClick={this.onClick.bind(this, image._id)}
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
