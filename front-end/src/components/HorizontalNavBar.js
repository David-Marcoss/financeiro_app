import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function HorizontalNavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar mt-3 mr-3 border-bottom">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Dashboard</a>
        <div className="d-flex">
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
          <span className="ms-2">Usuário</span>
        </div>
      </div>
    </nav>
    
  );
}

export default HorizontalNavBar;
