import React from "react";
import Axios from "axios";
import "./Image.css";

export default class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentId: this.props.comment._id,
      imageId: this.props.imageId
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    Axios.delete(
      "/freeshot/dashboard/image/comment/" +
        this.state.imageId +
        "/" +
        this.state.commentId
    )
      .then(response => {
        this.props.history.push("/all");
      }) //filter the comments
      .catch(error => console.log(error));
  }

  render() {
    const comment = this.props.comment;

    return (
      <div class="col-md-12 cell">
        <span class="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={comment.avatar}
              alt=""
            />
          </a>
        </span>
        <span class="col-md-4 text-center">{comment.username}</span>
        <span class="col-md-4" style={{ wordWrap: "break-word" }}>
          {comment.text}
        </span>
        <span class="col-md-2">
          <button
            onClick={this.onClick}
            type="button"
            className="btn btn-sm btn-danger mr-1"
          >
            <i className="fas fa-times" />
          </button>
        </span>
      </div>
    );
  }
}
