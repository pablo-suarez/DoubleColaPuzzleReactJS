import React from 'react';
import logo from './logo.svg';
import './App.css';
import Results from './components/Results';
import head from '../src/assets/head.png';




function App() {
  
  return (
    <div className="App">
      <div className="head">
        <img src={head} alt='head'/>
      </div>

      <Results/>
    </div>
  );
}

export default App;
