import React, { Component } from "react";
import Axios from "axios";
import RenderImage from "./RenderImage";
import "./Image.css";

export default class DisplayUserUploads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  //API call to get list of all images
  componentDidMount() {
    console.log(this.props.username);
    Axios.get("/freeshot/dashboard/image/username/" + this.props.username)
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
    const style = {
      outlineOffset: "15px",
      outlineColor: "#17a2b8",
      outlineStyle: "ridge",
      backgroundColor: "#eee"
    }; //border for images
    const imgStyle = images.length > 0 ? style : null;

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
