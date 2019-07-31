import React from "react";
import ReactDOM from "react-dom";
import { Switch, Link, Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import AboutERP from "./component/js/AboutErp";
import AboutLago from "./component/js/AboutLago";
import Contact from "./component/js/Contact";
import Login from "./component/js/Login";
import Employee from "./component/js/Employee";
import HR from "./component/js/HR";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import * as serviceWorker from "./serviceWorker";

const routing = (
  <Router>
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link className="links" to="/">
          Lagotronics
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" />
          <Nav>
            <Link className="links" to="/aboutERP/">
              About ERP
            </Link>
          </Nav>
          <Nav>
            <Link className="links" to="/aboutLago/">
              About Lagotronics
            </Link>
          </Nav>
          <Nav>
            <Link className="links" to="/Contact">
              Contact
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/employee/" component={Employee} />
        <Route exact path="/HR/" component={HR} />
        <Route exact path="/aboutERP/" component={AboutERP} />
        <Route exact path="/aboutLago/" component={AboutLago} />
        <Route exact path="/Contact/" component={Contact} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
