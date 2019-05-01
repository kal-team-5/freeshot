import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import Profiles from './components/profiles/Profiles';
import EditProfile from './components/edit-profile/EditProfile';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/common/PrivateRoute';
import {Provider} from 'react-redux';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import store from './store';
import Dashboard from './components/dashboard/Dashboard';
import SearchProfile from './components/search/SearchProfile';
import ImageUpload from "./components/image/ImageUpload";
import AddCommentsForImage from "./components/image/AddCommentsForImage";
import './App.css';


//check  for token 
if(localStorage.jwtToken){
  //set auth token header
  setAuthToken(localStorage.jwtToken);

  //decode get user info
  const decoded = jwt_decode(localStorage.jwtToken);

  //set user and isAuthenticated in redux
   store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime =Date.now()/1000;
  if(decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    
    //redirect to loginUser
    window.location.href='/login';
  }
}

class App extends Component {
  
  render() {
    return (
     <Provider store={store}>
      <Router>
        <div className="App">
        <Navbar />
        <Route  exact path="/" component={Landing}/>
          <div className="container">
              <Route  exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:username" component={Profile} />
              <Route exact path="/search/:username" component={SearchProfile} />
              <Route exact path="/image-upload" component={ImageUpload} />
              
            
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
      
              <Switch>
                <PrivateRoute exact path="/add-comments/:id" component={AddCommentsForImage} />
              </Switch>
          </div>
        <Footer />
        </div>
      </Router> 
      </Provider>  
    );
  }
}

export default App;
