import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 
import Home from "./Home";
import Story from './Story';

class App extends Component {
  render() {
    return (
     <Router>
       <Switch>
         <Route exact path="/" component={Home}/>
         <Route exact path="/stories/:storyId" component={Story}/>
         
       </Switch>  
     </Router>
    );
  }
}

export default App;
