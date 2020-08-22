import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Word from "./WordPage";
import Home from "./components/Home";
import Vocab from "./components/Vocab";
import Summary from "./components/Summary";

export default function App() {
  return (
    <Router>
      <div className="ext">
        <Switch>
          <Route path="/vocab">
              <Vocab></Vocab>
          </Route>


          <Route path="/summary">
              <Summary></Summary>
          </Route>

          <Route path="/">
              <Home></Home>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }

function tabLink() {
  /* eslint-disable no-undef */
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      alert(tabs[0].url);
      var urlTab = tabs[0].url;
      console.log(urlTab);
   }
);
}
// function About() {
//   <Word></Word>
//   console.log("about");
//   console.log(window.location.href);
//   tabLink();
//   return <h2>About</h2>;
// }

function Users() {
  return <h2>Users</h2>;
}

function Test() {
  console.log("TEST");
  // console.log(window.location.href);
  // console.log("Hello");
}
// var currentURL;

// chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, 
// function(tabs){
// 	getCurrentURL(tabs[0].url);
// });

// function getCurrentURL(tab){
// 	currentURL = tab;
// }


