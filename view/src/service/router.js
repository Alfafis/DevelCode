import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "../page/lista/lista";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
    </BrowserRouter>
  );
};

export default Routes;
