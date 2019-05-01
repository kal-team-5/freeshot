import React from "react";
import "./Image.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CommentItem extends React.Component {
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
    const loggedInUser = this.props.auth.user.username;
    return (
      <div className="row">
        <div className="col-md-1">
          <img
            className="rounded-circle d-none d-md-block"
            src={comment.avatar}
            alt=""
          />
        </div>
        <div className="col-md-3 text-left">{comment.username}</div>
        <div className="col-md-5" style={{ wordWrap: "break-word" }}>
          {comment.text}
        </div>
        <div className="col-md-2">
          {comment.username === loggedInUser ? (
            <button
              onClick={this.onChildDelete}
              type="button"
              className="btn btn-sm btn-danger mr-1"
            >
              <i className="fas fa-times" />
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}
CommentItem.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = reduxState => ({
  auth: reduxState.auth
});

export default connect(mapStateToProps)(CommentItem);
