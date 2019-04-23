import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { unfollow } from '../../actions/dashboardActions';



class Following extends Component {
    onDeleteClick(id) {
        this.props.unfollow(id);
      }
    render() {
        //console.log("edu" + this.props.followers.fl._id);
        const following = this.props.following.map(fl => (
          <tr key={fl._id}>
            <td>{fl.username}</td>
            <td>
            <button
            onClick={this.onDeleteClick.bind(this, fl._id)}
            className="btn btn-danger"
          >
            Following
          </button>
          </td>
          </tr>
        ));
        return (
          <div>
          <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal1">
              Following
          </button>
         <div className="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">Following</h4>
                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                
              </div>
              <div className="modal-body">
                {following}
              </div>
              
            </div>
          </div>
          </div>
          
            
          </div>
        );
      }
    }


Following.propTypes = {
    unfollow: PropTypes.func.isRequired
    };
    
export default connect(null, { unfollow })(Following);