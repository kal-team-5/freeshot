import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
//import { unfollow } from '../../actions/dashboardActions';
import { Link } from 'react-router-dom';

class Followers extends Component {
  

  render() {
    //console.log("edu" + this.props.followers.fl._id);
    const followers = this.props.followers.map(fl => (
      <tr key={fl._id}>
        <td>{fl.username}</td>
     </tr>
    ));
    return (
      <div>
      <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal">
          Followers
      </button>
     <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
          <h4 className="modal-title" id="myModalLabel">Followers</h4>
            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
            
          </div>
          <div className="modal-body">
            {followers}
          </div>
          
        </div>
      </div>
      </div>
      
        
      </div>
    );
  }
}



export default Followers;