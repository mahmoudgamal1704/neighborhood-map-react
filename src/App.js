import React, { Component } from 'react';

import './App.css';

class App extends Component {
  componentDidMount() {
  window.initMap = this.initMap;
  this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBZjYXBlQ61P4-XqTZiWi0wEUGhdDEedF4&v=3&callback=initMap');
}
  initMap = () => {
    var map;
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 31.199752, lng: 29.893712},
      zoom: 12
    });
}
 loadJS = (src) => {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}
  hidebar = () => {
  var sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle("hidden");
}
  close = () => {
   var sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle("hidden");
}
  render() {
    return (
      <div className="App">
        <nav className="w3-sidebar w3-bar-block w3-border-right hidden side" id="sidebar">
          <a onClick={this.close} className="w3-bar-item w3-large">Close &times;</a>
          <h3>Gemy Locations</h3>
          <input type="text" name="search" placeholder="search here"/><span className="fa fa-filter">Filter</span>
        </nav>
        <div className="main">
          <header>
            <a className="fa fa-bars" id="bar" onClick={this.hidebar}></a>
          </header>
          <div id="map"></div>
        </div>
      </div>
    );
  }
}

export default App;
