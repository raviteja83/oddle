import React, { Component,PropTypes} from 'react';
import {Link} from 'react-router';
import './App.css';

class Card extends Component {
  render() {
    return (
      <div className="col-md-6">
         <div className="user">
            <img className="avatar" alt={this.props.name} src={this.props.profile_image_url}></img>
            <div className="info">
              <Link to={'users/'+this.props.name}>
                <div className="title">
                    {this.props.name}
                </div>
               </Link> 
            </div>
         </div>
      </div>
    );
  }
}

Card.propTypes = {
    name : PropTypes.string,
    profile_image_url : PropTypes.string,
    data:PropTypes.object
}


export default Card;
