import React from 'react';
import './App.css';
import Login from './components/login.component.js';
import Home from './components/home.component.js';
import Patients from './components/patients.component.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Route,Switch, Router} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Route exact path='/patient' component={Patients}></Route>
     <Route exact path='/home' component={Home}></Route>
     <Route exact path='/' component={Login}></Route>
    </div>
    </BrowserRouter>
  );
}

export default App;