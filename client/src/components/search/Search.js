import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


 class Search extends Component {
    constructor(){
        super();
        this.state={
          search:""
     };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
   
     onChange(e){
       this.setState({search:e.target.value});
     }
   
    onSubmit(e){
      e.preventDefault();
    
    }  

 

  render() {
   

    return (
        <div className="search">
           <form noValidate onSubmit={this.onSubmit}>
                   <div className="input-group">
                    <input type="text" placeholder="Search" name="search" value={this.state.search} onChange={this.onChange} />
                    <div className="input-group-append">
                    <Link to={`/search/${this.state.search}`}>
                    <button type="submit" className="input-group-text bg-primary text-white">
                     <i className="fas fa-search"></i>
                    </button>  </Link>
                  </div>
                    
                  </div>
                  </form>
              </div>
            
          
          )
        }
      }

      export default Search;

    