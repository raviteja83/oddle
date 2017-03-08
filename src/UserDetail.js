import React, { Component } from 'react';
import Halogen from 'halogen';
import $ from 'jquery';
import Repo from './Repo';
import './App.css';

class UserDetail extends Component {
  constructor(props){
    super(props);
    this.state = { 
      data:[],
      loading: false,
      error: ''
    };
    this.userInfo = {};
  }

  componentWillMount() {
      this.getData();
  }

  getData = ()=>{
     this.setState({ loading: this.state.data.length === 0});
     let ref = this;
     $.ajax({
            type: 'GET',
            url: 'https://api.github.com/users/'+this.props.params.userId+'/repos',
            dataType: 'json',
            success: function(response) {
              if(response.length >  0){
                ref.userInfo = response[0].owner;
              }
              ref.setState({
                loading: false,
                data: response,
                error: response.length ? '' : 'This user has no repos'
              });
            },
            error: function(xhr) {
              ref.setState({
                loading: false,
                error: xhr.status
              });
            }
      });
  }

  render() {
    return (
      <div className="container">
          <div className="user-detail"> 
            <img className="avatar" alt='' src={this.userInfo.avatar_url}/>
            <span className="title">{this.userInfo.login}</span>
          </div>
       <div>
          {
            this.state.data.length 
            ?
            this.state.data.map((d,i)=>{
              return <Repo key={i} name={d.name}
                           description={d.description}
                           stars={d.stargazers_count}
                           forks={d.forks_count}/>
            })
            :
            <div className="error">{this.state.error}</div>
            }
         <div>
           {
            this.state.loading 
            ?
            <div className="loader">
              <Halogen.ClipLoader color="#121517"/>  
              <div>Loading...</div>
            </div>    
            :  
            null
          }
          </div>   
        </div>
      </div>
    );
  }
}

export default UserDetail;
