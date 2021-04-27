import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home, ErrorPage } from "./pages";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='*'>
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
