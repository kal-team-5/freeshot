import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import ImageUpload from "./components/ImageUpload";
import Header from "./components/Header";
import Footer from "./components/Footer"; //RJs Footer
import Main from "./components/Main";
import Dashboard from "./components/Dashboard";
import DisplayAllImages from "./components/DisplayAllImages";
import AddComments from "./components/AddComments";
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/image-upload" component={ImageUpload} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/all" component={DisplayAllImages} />
              <Route exact path="/add-comments/:id" component={AddComments} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
