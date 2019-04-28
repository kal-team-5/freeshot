import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Dashboard extends Component {
  
  render() {
    return (
      <div>
        <Link to="/image-upload" className="btn btn-md btn-info">
          Upload Image
        </Link>
      </div>
    );
  }
}
