import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './views/LandingPage.jsx';
import Home from './views/Home.jsx';
// import Form from './views/Form.jsx';
// import Detail from './views/Detail.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/home' component={Home} />
          {/* <Route exact path='/form' component={Form} />
          <Route exact path='/dogs/:id' component={Detail} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
