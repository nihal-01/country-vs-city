import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home, ErrorPage, Subscribe } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/subscribe'>
          <Subscribe />
        </Route>
        <Route path='*'>
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
