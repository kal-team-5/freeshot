import React, { Component } from "react";
import Axios from "axios";
import RenderImage from "./RenderImage";
import "./Image.css";

export default class DisplayAllImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  //API call to get list of all images
  componentDidMount() {
    Axios.get("/freeshot/dashboard/image")
      .then(response => {
        this.setState({ images: response.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { images } = this.state;
    let allImages = null;
    const imageData = (
      <div className="row">
        {
          (allImages =
            images.length > 0
              ? (allImages = images.map(image => (
                  <RenderImage key={image._id} data={image} />
                )))
              : null)
        }
      </div>
    );

    return <div>{imageData}</div>;
  }
}
