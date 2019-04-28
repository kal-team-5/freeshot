import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";
import CommentItem from "./CommentItem.js";
import "./Image.css";

export default class AddComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      comments: [],
      imageId: this.props.match.params.id,
      imageSrc: "",
      imageCaption: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    //API call to get image details for the selected image
    axios
      .get("/freeshot/dashboard/image/" + this.state.imageId)
      .then(response => {
        this.setState({
          comments: response.data.comments,
          imageSrc: response.data.url,
          imageCaption: response.data.caption
        });
      })
      .catch(error => console.log(error));
  }

  //ReactApi exception handling
  componentDidCatch(error, info) {
    this.setState({ errors: error.response.data });
  }

  /*componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        errors: nextProps.error
      });
    }
  }*/

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const addComment = {
      text: this.state
        .text /*, //comment text
      username: "TD_User", //username from request
      user: "5cba441d9979b100160cb7a6", //user object from request
      avatar:
        "//www.gravatar.com/avatar/e89296b53b13ae2313c2879824d15c27?s=200&r=pg&d=mm" //gravatar of the user from request*/
    };

    axios
      .post(
        `/freeshot/dashboard/image/comment/${this.state.imageId}`,
        addComment
      )
      .then(response => this.props.history.push("/all"))
      .catch(error => {
        this.componentDidCatch(error, "Server error");
      });
  }

  render() {
    const error = this.state.errors;
    const comments = this.state.comments;

    var commentItems = null;

    if (comments != null && comments.length > 0) {
      commentItems = comments.map(comment => (
        <CommentItem
          key={comment._id}
          comment={comment}
          imageId={this.state.imageId}
        />
      ));
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 card card-body mb-2">
            <img src={this.state.imageSrc} alt={this.state.imageCaption} />
            <p>{this.state.imageCaption}</p>
          </div>

          <div className="col-md-8">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <div className="input-group mb-3">
                  <input
                    className={classnames(
                      "form-control form-control-md input-md",
                      {
                        "is-invalid": error
                      }
                    )}
                    placeholder="Please add comments"
                    name="text"
                    value={this.state.text}
                    onChange={this.onChange}
                  />
                  {error.text && (
                    <div className="invalid-feedback">{error.text}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-dark">
                  Add Comments
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row">{commentItems}</div>
      </div>
    );
  }
}
