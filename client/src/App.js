import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ImageUpload from "./components/ImageUpload";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Dashboard from "./components/Dashboard";
import DisplayAllImages from "./components/DisplayAllImages";
import AddComments from "./components/AddComments";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Main} />
          <div className="container">
            <Route exact path="/image-upload" component={ImageUpload} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/all" component={DisplayAllImages} />
            <Route exact path="/add-comments/:id" component={AddComments} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
