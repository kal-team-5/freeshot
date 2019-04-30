import "./Image.css";

import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";
import "./Image.css";
import CommentItem from "./CommentItem";

export default class AddCommentsForImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      comments: [],
      image: {},
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  componentDidMount() {
    //API call to get image details for the selected image
    axios
      .get("/freeshot/dashboard/image/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          comments: response.data.comments,
          image: response.data
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
    //clear the errors on form
    
    const addComment = {
      text: this.state.text
    };
    //Add Comments
    axios
      .post(
        `/freeshot/dashboard/image/comment/${this.state.image._id}`,
        addComment
      )
      .then(response => {
        this.setState({
          comments: response.data
        });
      })
      .catch(error => {
        this.componentDidCatch(error, "Server error");
      });
  }
  //Delete Comments
  onDeleteClick(commentId) {
    axios
      .delete(
        "/freeshot/dashboard/image/comment/" +
          this.state.image._id +
          "/" +
          commentId
      )
      .then(response => {
        const updatedComments = this.state.comments.filter(
          comment => comment._id !== commentId
        );
        this.setState({
          comments: updatedComments
        });
      })
      .catch(error => console.log(error));
  }
  //Like Image
  onLikeClick(imageId) {
    axios
      .post("/freeshot/dashboard/image/like/" + imageId)
      .then(response => {
        this.setState({
          image: response.data
        });
      })
      .catch(error => {
        this.componentDidCatch(error, "Error");
        console.log(error);
      });
  }
  //Find liked user if logged in
  findUserLike(likes) {
    /*const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }*/ //TOBE TESTED AFTER LOGIN INTEGRATION.REQUIRES USER DATA
    return false;
  }
  //Render image,display comment form and comments list
  render() {
    const error = this.state.errors;
    const comments = this.state.comments;
    var commentItems = null;
    if (comments != null && comments.length > 0) {
      commentItems = comments.map(comment => (
        <CommentItem
          key={comment._id}
          comment={comment}
          imageId={this.state.image._id}
          deleteAction={this.onDeleteClick}
        />
      ));
    }
    return (
      <div className="container">
        <div className="image row">
          <div className="col-md-4 card card-body mb-2">
            <img
              src={this.state.image.url}
              alt={this.state.image.caption}
              className="img-responsive"
            />
            <p>
              <b>{this.state.image.caption}</b>
            </p>
            <div className="row">
              <div className="col-md-6">
                <span>
                  <button
                    onClick={this.onLikeClick.bind(this, this.state.image._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i
                      className={classnames("fas fa-thumbs-up", {
                        "text-info": this.findUserLike(this.state.image.likes)
                      })}
                    />
                    <span className="badge badge-light">
                      {this.state.image.likes === undefined
                        ? 0
                        : this.state.image.likes.length}
                    </span>
                  </button>
                </span>
              </div>
              {error.alreadyliked !== undefined &&
              error.alreadyliked.length > 0 ? (
                <div className="col-md-6 float-right text-right">
                  {error.alreadyliked}
                </div>
              ) : (
                " "
              )}
            </div>
          </div>

          <div className="col-md-8">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <div className="input-group mb-3">
                  <input
                    className={classnames(
                      "form-control form-control-md input-md",
                      {
                        "is-invalid": error.text
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

                <button type="submit" className="btn btn-md btn-info">
                  Add Comments
                </button>
              </div>
            </form>
            <div className="container">{commentItems}</div>
          </div>
        </div>
      </div>
    );
  }
}
