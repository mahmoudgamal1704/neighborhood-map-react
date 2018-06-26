import React, { Component } from 'react';

class map extends Component {
	 hidebar = () => {
  var sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle("hidden");
}

	 render() {
    		return (
    		<div className="main" role="application">
          <header>
            <a className="fa fa-bars" id="bar" onClick={this.hidebar}></a>
          </header>
          <div id="map" role="application"></div>
        </div>

		)
}
}
export default map;