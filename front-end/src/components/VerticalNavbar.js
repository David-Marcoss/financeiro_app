import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt,faFileAlt,faFileInvoice, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function VerticalNavBar() {
  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-primary sidebar collapse">
      <div className="position-sticky pt-3">
        <div className="user-profile text-center d-flex align-items-center justify-content-center">
          <Link to="/dashboard">
            <h5 className="ml-2 text-white">Gestão Financeira</h5>
          </Link>
        </div>

        <ul className="nav flex-column mt-5">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/dashboard">
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
              <span className="ml-4 p-1">Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/invoiceform">
              <FontAwesomeIcon icon={faFileInvoice} className="mr-2" />
              <span className="ml-2 p-1">Criar Notas</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/invoices">
              <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
              <span className="ml-2 p-1">Lista Notas</span>
            </Link>
          </li>


          <li className="nav-item raw">
            <button className="nav-link">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              <span className="ml-2 p-1">Sair</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default VerticalNavBar;
