import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,IndexRoute, browserHistory} from 'react-router'
import App from './App';
import UserDetail from './UserDetail';

ReactDOM.render(<Router history={browserHistory}>
  <Route path="/">
    <IndexRoute component={App}/>
    <Route path="users/:userId" component={UserDetail}/>
  </Route>
</Router>,
 document.getElementById('root'));