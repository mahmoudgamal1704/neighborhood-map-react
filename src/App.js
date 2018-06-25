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
        typee:'Scientific place',
        add:'Al Khartom Sq., Al Mesallah Sharq, Qesm Al Attarin, Alexandria Governorate',
        logo:'http://www.vetogate.com/upload/photo/news/311/7/500x282o/789.jpg?q=1',
        marker:''
      },
      {
        name:'Bibliotheca Alexandrina Conference Center (BACC)',
        lat:31.208243,
        lng:29.908580,
        typee:'A cultural place',
        add:'El-Gaish Rd, Al Azaritah WA Ash Shatebi, Qesm Bab Sharqi, Alexandria Governorate',
        logo:'http://www.alef-yaa.com/media/pics/9738-2.jpg',
        marker:''
      },
      {
        name:'Citadel of Qaitbay',
        lat:31.213986,
        lng:29.885598,
        typee:'Historical place',
        add:'As Sayalah Sharq, Qesm Al Gomrok, Alexandria Governorate',
        logo:'https://upload.wikimedia.org/wikipedia/commons/c/c3/Qaitbay_Castle_in_Alexandria.jpg',
        marker:''
      },
      {
        name:'El Gondy El Maghool Square',
        lat:31.199999,
        lng:29.893725,
        typee:'Political place',
        add:'Al Gonday Al Maghool Sq., Al Mansheyah Al Kubra, Qesm Al Mansheyah, Alexandria Governorate',
        logo:'http://www.d1g.com/photos/44/77/2947744_max.jpg',
        marker:''
      },
      {
        name:'Raml Station',
        lat:31.200189,
        lng:29.899474,
        typee:'A popular place',
        add:'Abou Al Kassm Al Shabi, Al Mesallah Sharq, Qesm Al Attarin, Alexandria Governorate 21532',
        logo:'http://www.vetogate.com/upload/photo/gallery/188/5/370.jpg',
        marker:''
      }
  ],
  //this for store data for my city
  city:{
    name:'Alexandria',
    lat: 31.204752,
    lng: 29.893712,
  },
  filterdlocatios: []
}
  componentDidMount() {
  window.initMap = this.initMap;
  window.gm_authFailure = this.gm_authFailure;
  this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBZjYXBlQ61P4-XqTZiWi0wEUGhdDEedF4&v=3&callback=initMap');
  this.setState({
            filterdlocatios: this.state.locations
        });
  
}
gm_authFailure(){
    window.alert("Google Maps error!")
}
  initMap = () => {
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: this.state.city.lat, lng: this.state.city.lng},
      zoom: 12,
    mapTypeId: window.google.maps.MapTypeId.TERRAIN,
      disableDefaultUI: true  
    });
     var largeInfowindow = new window.google.maps.InfoWindow();
    this.state.filterdlocatios.map(location => (
      location.marker = new window.google.maps.Marker({
          position: {lat: location.lat , lng: location.lng},
          map: map,
          title: location.name,
          add: location.add,
          logo:location.logo,
          typee:location.typee
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
  mak.setMap(null);
  var query = event.target.value;
  if (query){
  var newlocations = [] ;
    this.state.filterdlocatios.map(location => {
      if ( location.name.toUpperCase().indexOf(query.toUpperCase()) >= 0 ) {
       return newlocations.push(location);
      }
    })
    this.setState({
            filterdlocatios: newlocations
        });
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
          <input role="search"  aria-labelledby="Search Locations" type="text"  name="search" placeholder="search here" onChange={this.filterlocations} onKeyPress={this.filterlocations} onClick={this.filterlocations} id="txt"/><span ><button onClick={this.drobdown} className="dropbtn"><span className="fa fa-filter">Filter</span></button>
                      <div id="myDropdown" className="dropdown-content">
                        {this.state.locations.map(location => (
                            <a key={location.lat} onClick={this.filter}>{location.name}</a>
                          ))}
                          <a onClick={this.refresh} > ALL</a>
                      </div></span>
          <ol>
            {this.state.filterdlocatios.map(location => (
            <li role="button" key={location.lat} onClick={this.open} tabIndex={this.state.filterdlocatios.indexOf(location)+1}>{location.name}</li>
          ))}
          </ol>
        </nav>
        <div className="main" role="application">
          <header>
            <a className="fa fa-bars" id="bar" onClick={this.hidebar}></a>
          </header>
          <div id="map" role="application"></div>
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
      
     var clientID = "AU431WRKS3SLDDFNDVPCEXGLBKQOXKBJSLGREEIKZ103E5OF";
  var clientSecret = "NKYLROA3QY2MKOBL2O4JWFO0NEUADXXUECON2EJ1GVE04QGK";
  var URL = "https://api.foursquare.com/v2/venues/search?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
  fetch(URL)
    .then(
      function (response){
        if (response.status !== 200){
          infowindow.setContent('Data Can not loaded');
          return;
        }
        response.json().then(function(data){
          var locationData = data.response.venues[0];
          var loactionname = locationData.name;
          var content = '<div><p>' + marker.title +'</p><img src=' +  marker.logo  + ' alt="' + loactionname + ' Picture" class="markerlogo"/><p> ' + marker.typee + '</p><p>'+ marker.add + '</p></div>';
          
          var Link = '<a href="https://foursquare.com/v/' + locationData.id + '" target="_blank"> Read More From Here</a>';
          infowindow.setContent(content + Link);
        })
      }
      )
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
  }
}