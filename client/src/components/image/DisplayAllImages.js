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
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  //API call to get list of all images
  componentDidMount() {
    Axios.get("/freeshot/dashboard/image")
      .then(response => {
        this.setState({ images: response.data });
      })
      .catch(err => console.log(err));
  }

  //Delete the image
  onDeleteClick(imageId) {
    alert("Deleting the Image ");
    Axios.delete("/freeshot/dashboard/image/" + imageId)
      .then(response => {
        const updatedList = this.state.images.filter(
          image => image._id !== imageId
        );
        this.setState({
          images: updatedList //Updates image list in the UI post-delete
        });
      })
      .catch(error => {
        this.componentDidCatch(error, "Delete image failed");
        console.log(error);
      });
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
                  <RenderImage
                    key={image._id}
                    data={image}
                    deleteAction={this.onDeleteClick}
                  />
                )))
              : null)
        }
      </div>
    );

    return <div>{imageData}</div>;
  }
}
