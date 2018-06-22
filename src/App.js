import React, { Component } from 'react';

import './App.css';
var map ;

class App extends Component {
state = {
  locations: [
      {
        name:'Alexandria Faculty of Medicine',
        lat:31.202147,
        lng:29.904264,
        add:'Al Khartom Sq., Al Mesallah Sharq, Qesm Al Attarin, Alexandria Governorate'
      },
      {
        name:'Bibliotheca Alexandrina Conference Center (BACC)',
        lat:31.208243,
        lng:29.908580,
        add:'El-Gaish Rd, Al Azaritah WA Ash Shatebi, Qesm Bab Sharqi, Alexandria Governorate'
      },
      {
        name:'Citadel of Qaitbay',
        lat:31.213986,
        lng:29.885598,
        add:'As Sayalah Sharq, Qesm Al Gomrok, Alexandria Governorate'
      },
      {
        name:'El Gondy El Maghool Square',
        lat:31.199999,
        lng:29.893725,
        add:'Al Gonday Al Maghool Sq., Al Mansheyah Al Kubra, Qesm Al Mansheyah, Alexandria Governorate'
      },
      {
        name:'Raml Station',
        lat:31.200189,
        lng:29.899474,
        add:'Abou Al Kassm Al Shabi, Al Mesallah Sharq, Qesm Al Attarin, Alexandria Governorate 21532'
      }
  ]
}
  componentDidMount() {
  window.initMap = this.initMap;
  this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBZjYXBlQ61P4-XqTZiWi0wEUGhdDEedF4&v=3&callback=initMap');
}
  initMap = () => {
    var map;
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 31.199752, lng: 29.893712},
      zoom: 14
    });
    var marker;
    var artt ;
    var markers = [] ;
    var largeInfowindow = new window.google.maps.InfoWindow();
    this.state.locations.map(location => (
      marker = new window.google.maps.Marker({
          position: {lat: location.lat , lng: location.lng},
          map: map,
          title: location.name,
          add: location.add
        }),
      marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        })
    ))
   
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
  filterlocations = (event) => {
  var newlocations = [] ;
    this.state.locations.map(location => {
      if ( location.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0 ) {

      newlocations.push(location);
    }else {

  }
    })
    this.setState({
            locations: newlocations
        });
}
  render() {
    return (
      <div className="App">
        <nav className="w3-sidebar w3-bar-block w3-border-right hidden side" id="sidebar">
          <a onClick={this.close} className="w3-bar-item w3-large">Close &times;</a>
          <h3>Gemy Locations</h3>
          <input type="text" name="search" placeholder="search here" onChange={this.filterlocations}/><span className="fa fa-filter">Filter</span>
          <ol>
            {this.state.locations.map(location => (
            <li key={location.lat}>{location.name}</li>
          ))}
          </ol>
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
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div><p>' + marker.title +'</p><p>'+ marker.add + '</p></div>');
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
    }
}