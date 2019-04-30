import axios from 'axios';
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE 
} from './types';

//GET current dashboard
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/freeshot/dashboard') 
    .then(res => dispatch({
        type:GET_PROFILE,
        payload:res.data
    }))
    .catch(err => dispatch({
        type:GET_PROFILE,
        payload:{}
    }));

};

//Get dashboard by handle
export const getProfileByHandle = (username) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/freeshot/dashboard/username/${username}`)
    .then(res => dispatch({
         type:GET_PROFILE,
         payload:res.data
    }))
    .catch(err => dispatch({
        type:GET_PROFILE,
        payload:null
    }))
};

//edit profile
export const editProfile = (profileData,history) => dispatch => {
  axios.post('/freeshot/dashboard/edit', profileData)
  .then(res => history.push('/dashboard'))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload:err.response.data
  }))
};

//Add follower
export const addfollow = (id,name,username) => dispatch => {
  axios.post(`/freeshot/dashboard/follow/${id},${name},${username}`)
  .then(res => dispatch({
    type:GET_PROFILE,
    payload:res.data
}))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload:err.response.data
  }))
};


//unfollow delete follower
export const unfollow = (id) => dispatch => {
  axios.delete(`/freeshot/dashboard/unfollow/${id}`)
  .then(res => dispatch({
      type:GET_PROFILE,
      payload:res.data
  }))
  .catch(err => dispatch({
      type:GET_ERRORS,
      payload:err.response.data
  }))
};

//  GET all followers
export const getFollowers = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/freeshot/dashboard/followers')
    .then(res => dispatch({
        type:GET_PROFILES,
        payload:res.data
    }))
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:null
    }))
  };

  //  GET all following
export const getFollowing = (username) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/freeshot/dashboard/following/${username}`)
    .then(res => dispatch({
        type:GET_PROFILES,
        payload:res.data
    }))
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:null
    }))
  };

//  GET  follower
export const getFollower = (username) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/freeshot/dashboard/follower/${username}`)
    .then(res => dispatch({
        type:GET_PROFILES,
        payload:res.data
    }))
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:null
    }))
  };




//Explore  GET all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/freeshot/dashboard/profile/explore')
  .then(res => dispatch({
      type:GET_PROFILES,
      payload:res.data
  }))
  .catch(err => dispatch({
      type:GET_ERRORS,
      payload:null
  }))
};

//Delete account and profile
export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure? this can NOT be undone!'))
    axios.delete('/freeshot/dashboard')
    .then(res => dispatch({
        type:SET_CURRENT_USER,
        payload:{}
    }))
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }))
};


//set profile loading
export const setProfileLoading = () =>{
    return{
        type:PROFILE_LOADING
    };
};

//clear profile
export const clearCurrentProfile = () => {
    return{
        type:CLEAR_CURRENT_PROFILE
    }
    
}