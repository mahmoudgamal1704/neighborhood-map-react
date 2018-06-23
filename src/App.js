import React, { Component } from 'react';

import './App.css';
var map ;
var markers = [] ;
class App extends Component {

state = {
  locations: [
      {
        name:'Alexandria Faculty of Medicine',
        lat:31.202147,
        lng:29.904264,
        add:'Al Khartom Sq., Al Mesallah Sharq, Qesm Al Attarin, Alexandria Governorate',
        marker:''
      },
      {
        name:'Bibliotheca Alexandrina Conference Center (BACC)',
        lat:31.208243,
        lng:29.908580,
        add:'El-Gaish Rd, Al Azaritah WA Ash Shatebi, Qesm Bab Sharqi, Alexandria Governorate',
        marker:''
      },
      {
        name:'Citadel of Qaitbay',
        lat:31.213986,
        lng:29.885598,
        add:'As Sayalah Sharq, Qesm Al Gomrok, Alexandria Governorate',
        marker:''
      },
      {
        name:'El Gondy El Maghool Square',
        lat:31.199999,
        lng:29.893725,
        add:'Al Gonday Al Maghool Sq., Al Mansheyah Al Kubra, Qesm Al Mansheyah, Alexandria Governorate',
        marker:''
      },
      {
        name:'Raml Station',
        lat:31.200189,
        lng:29.899474,
        add:'Abou Al Kassm Al Shabi, Al Mesallah Sharq, Qesm Al Attarin, Alexandria Governorate 21532',
        marker:''
      }
  ],
  filterdlocatios: []
}
  componentDidMount() {
  window.initMap = this.initMap;
  this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBZjYXBlQ61P4-XqTZiWi0wEUGhdDEedF4&v=3&callback=initMap');
  this.setState({
            filterdlocatios: this.state.locations
        });
  
}
  initMap = () => {
    var map;
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 31.199752, lng: 29.893712},
      zoom: 14
    });
    var marker;
    var markers = [] ;
    var largeInfowindow = new window.google.maps.InfoWindow();
    this.state.filterdlocatios.map(location => (
      location.marker = new window.google.maps.Marker({
          position: {lat: location.lat , lng: location.lng},
          map: map,
          title: location.name,
          add: location.add
        }),
      location.marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        }),
        markers.push(location.marker)
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
  var mak = this.getmarker('Alexandria Faculty of Medicine')
  console.log(mak)
  mak.setMap(null);
  var query = event.target.value;
  if (query){
  var newlocations = [] ;
    this.state.filterdlocatios.map(location => {
      if ( location.name.toUpperCase().indexOf(query.toUpperCase()) >= 0 ) {
        newlocations.push(location);
      }
    })
    console.log(newlocations.length)
    console.log(this.state.filterdlocatios.length)
    this.setState({
            filterdlocatios: newlocations
        });
        console.log(this.state.filterdlocatios.length)
}else {
  this.setState({
            filterdlocatios: this.state.locations
        });
}
        this.initMap();
}
 delay = (ms) => {
   ms += new Date().getTime();
   while (new Date() < ms){}
}
 drobdown = () => {
    document.getElementById("myDropdown").classList.toggle("show");
}
filter = (event) => {
  var bar = document.getElementById("txt")
  bar.value= event.target.innerText;
  document.getElementById("myDropdown").classList.toggle("show");
  bar.click();
}
refresh = () => {
 this.setState({
            filterdlocatios: this.state.locations
        });
        document.getElementById("myDropdown").classList.toggle("show");
        var bar = document.getElementById("txt")
        bar.value= "";
        this.initMap();
}
open = (event) => {
  window.google.maps.event.trigger(this.getmarker(event.target.innerText), 'click');
}
getmarker = (title) => {
  var location = this.state.locations.filter(locat => locat.name === title)
  return location[0].marker
}
  render() {
    return (
      <div className="App">
        <nav className="w3-sidebar w3-bar-block w3-border-right side" id="sidebar">
          <a onClick={this.close} className="w3-bar-item w3-large">Close &times;</a>
          <h3>Gemy Locations</h3>
          <input type="text"  name="search" placeholder="search here" onChange={this.filterlocations} onKeyPress={this.filterlocations} onClick={this.filterlocations} id="txt"/><span ><button onClick={this.drobdown} className="dropbtn"><span className="fa fa-filter">Filter</span></button>
                      <div id="myDropdown" className="dropdown-content">
                        {this.state.locations.map(location => (
                            <a key={location.lat} onClick={this.filter}>{location.name}</a>
                          ))}
                          <a onClick={this.refresh} > ALL</a>
                      </div></span>
          <ol>
            {this.state.filterdlocatios.map(location => (
            <li key={location.lat} onClick={this.open}>{location.name}</li>
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