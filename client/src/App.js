import React from 'react';
import { Route } from 'react-router-dom'

import Dashboard from './components/Dashboard'
import Pathfinder from './components/Pathfinder'

import './styles/style.css'

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Dashboard} />
      <Route path="/pathfinder" component={Pathfinder} />
    </div>
  );
}

export default App;
