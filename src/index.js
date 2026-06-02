import React from "react";
import ReactDOM from "react-dom";
import { Switch, Link, Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import AboutERP from "./component/js/AboutErp";
import AboutCompany from "./component/js/AboutCompany";
import Contact from "./component/js/Contact";
import Login from "./component/js/Login";
import Employee from "./component/js/Employee";
import HR from "./component/js/HR";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import * as serviceWorker from "./serviceWorker";
import HRLogin from "./component/js/LoginHR";
import BRAND from "./config/brand";

const routing = (
  <Router>
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link className="brand" to="/">
          {BRAND.name}
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
            <Link className="links" to="/about-company/">
              About {BRAND.name}
            </Link>
          </Nav>
          <Nav>
            <Link className="links" to="/Contact">
              Contact
            </Link>
          </Nav>
          <Nav>
            <Link className="lastlink" to="/HRLogin">
              Log In
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/employee/" component={Employee} />
        <Route exact path="/6RXYPvzzDGiNphnUrytD/" component={HR} />
        <Route exact path="/aboutERP/" component={AboutERP} />
        <Route exact path="/about-company/" component={AboutCompany} />
        <Route exact path="/Contact/" component={Contact} />
        <Route exact path="/HRLogin/" component={HRLogin} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
