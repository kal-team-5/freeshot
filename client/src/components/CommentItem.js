import React from "react";
import "./Image.css";

export default class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentId: this.props.comment._id,
      imageId: this.props.imageId
    };
    this.onChildDelete = this.onChildDelete.bind(this);
  }

  onChildDelete(e) {
    e.preventDefault();
    this.props.deleteAction(this.state.commentId);
  }
  render() {
    const comment = this.props.comment;

    return (
      <div className="row">
        <div className="col-md-2">
          <img
            className="rounded-circle d-none d-md-block"
            src={comment.avatar}
            alt=""
          />
        </div>
        <div className="col-md-3 text-center">{comment.username}</div>
        <div className="col-md-5" style={{ wordWrap: "break-word" }}>
          {comment.text}
        </div>
        <div className="col-md-2">
          <button
            onClick={this.onChildDelete}
            type="button"
            className="btn btn-sm btn-danger mr-1"
          >
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
    );
  }
}
