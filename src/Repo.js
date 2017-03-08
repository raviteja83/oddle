import React, { Component,PropTypes} from 'react';
import './App.css';

class Repo extends Component {
  render() {
    let {name,description,stars,forks} = this.props;  
    return (
        <div className="col-md-12">
            {
                name 
                ? 
                <div className="repo">
                    <div className="avatar">
                    <i className="fa fa-github" aria-hidden="true" style={{fontSize: 30}}></i>
                    </div>
                    <div className="info">
                        <div>{name}</div>
                        <div>{description}</div>
                        <div className="repo-detail">
                                <i className="fa fa-star" aria-hidden="true"></i>
                            <span>
                                {stars}
                             </span> 
                                <i className="fa fa-code-fork" aria-hidden="true"></i>
                             <span>  
                                {forks}
                            </span>
                        </div>   
                    </div>
                </div>
                :
                null
            }
        </div>
    );
  }
}

Repo.propTypes = {
    name : PropTypes.string,
    description : PropTypes.string,
    stars: PropTypes.number,
    forks: PropTypes.number
}

Repo.defaultProps = {
    stars: 0,
    forks: 0,
    name: null
}

export default Repo;
