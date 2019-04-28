import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";

class ImageUpload extends Component {
  //Import username as props from dashboard
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      caption: "",
      //username: this.props.auth.user.username,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const uploadImage = {
      url: this.state.url,
      caption: this.state.caption/*,
      username: this.state.username*/
    };
    //Upload image
    axios
      .post("/freeshot/dashboard/image/upload", uploadImage)
      .then(response => this.props.history.push("/all"))
      .catch(err => {
        this.componentDidCatch(err, "Image Upload Failure");
        console.log(err);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
    const error = this.state.errors;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <div className="input-group mb-3">
            <input
              className={classnames("form-control form-control-md input-md", {
                "is-invalid": error
              })}
              placeholder="Please enter Image Url"
              name="url"
              value={this.state.url}
              onChange={this.onChange}
            />
            {error.url && <div className="invalid-feedback">{error.url}</div>}
          </div>

          <div className="input-group mb-3">
            <input
              className={classnames("form-control form-control-md input-md", {
                "is-invalid": error
              })}
              placeholder="Provide a caption"
              name="caption"
              value={this.state.caption}
              onChange={this.onChange}
            />
          </div>

          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default ImageUpload;
