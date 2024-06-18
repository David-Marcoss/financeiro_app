import React from "react";
import { Route, Routes} from "react-router-dom";

import NotaForm from '../pages/FormOrder/FormOrder';
import Dashboard from '../pages/Dashboard/Dashboard';
import ListOrders from '../pages/ListInvoices/ListInvoices';

const MainRoutes = () => {
   return(
       <Routes>
           <Route path="/dashboard" element = { < Dashboard /> }  />
           <Route path="/invoiceform"  element = { < NotaForm />  } />
           <Route path="/invoices"    element=  { <ListOrders /> }  />
           <Route path="/"          element=  { <Dashboard /> }  />
       </Routes>
   )
}

export default MainRoutes;