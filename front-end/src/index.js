import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainRoutes from './Router/Routes';
import { BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
                
  </React.StrictMode>
);


reportWebVitals();
