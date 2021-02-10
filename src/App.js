import React, { Component } from 'react'
import { combineReducers } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'

import MainContainer from './MainContainer'
import { authReducer } from './common/auth'

class App extends Component {
  render() {
    return (
      <Router>
          <MainContainer />
      </Router>
    );
  }
}

export default App;

//ALL REDUCERS
export const rootReducer = combineReducers({
	auth: authReducer
});
