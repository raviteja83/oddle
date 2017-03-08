import React, { Component } from 'react';
import InfiniteScroller from 'react-infinite-scroller';
import User from './User';
import Halogen from 'halogen';
import $ from 'jquery';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      canSubmit : false,
      query: '',
      total_count: 0,
      data:[],
      page: 1,
      loading: false,
      error: 'Search for a user in the input box'
    };
  }

  getData = ()=>{
     let {data,page} = this.state;
     let ref = this;
     $.ajax({
            type: 'GET',
            url: 'https://api.github.com/search/users?q='+ref.state.query+'&page='+page,
            dataType: 'json',
            success: function(response) {
              page +=1;
              data = data.concat(response.items);
              let {total_count} = response; 
              ref.setState({
                page: page,
                data: data,
                loading: false,
                total_count: total_count,
                error: total_count ? '' : 'No Data found'
              });
            },
            error: function(xhr) {
              ref.setState({
                loading: false,
                error: xhr.status});
            }
      });
  }

  submit = (e)=> {
    e.preventDefault();
    this.setState({loading: true});
    this.getData();
  }

  onChangeValue =(event)=> {
    let new_query  = event.target.value || '';
    this.setState({
      canSubmit : new_query !== '',
      query: new_query,
      error : new_query === '' ? 'Search for a user in the input box' : ''
    });
  }
  
  render() {
    return (
      <div className="container">
        <div className="input-container">
            <form className="row">
            <input className="col-md-9" placeholder="search users" onChange={this.onChangeValue}/>
            <button className="col-md-2 btn btn-primary" type="submit" disabled={!this.state.canSubmit} onClick={this.submit}>Search</button>
            </form>
        </div>
            <InfiniteScroller
              loadMore={this.getData}
              initialLoad={false}
              hasMore={this.state.total_count > this.state.data.length} 
              loader={
                    <div className="loader">
                      <Halogen.ClipLoader color="#121517"/>  
                      <div>Loading...</div>
                    </div>
              }
            >
              <div className="row">

                    {
                      this.state.data.length 
                      ?
                      this.state.data.map((d,i)=>{
                        return <User key={i} name={d.login}
                                    profile_image_url={d.avatar_url}
                                    data={d}/>
                      })
                      :
                      <div className="error">{this.state.error}</div>
                      }
              </div>
              </InfiniteScroller>
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
    );
  }
}

export default App;
