import React from "react";
import "../css/login.css";
import { Form } from "react-bootstrap";
import logo from "../brand-logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import BRAND from "../../config/brand";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  NoBtn = () => {
    Swal.fire(
      "ATTENTION!",
      "Please contact your Human Resources Department for help.",
      "question"
    );
  };

  Login = () => {
    this.props.history.push("/employee");
  };
  render() {
    return (
      <div className="auth-page">
        <div className="login">
          <img src={logo} alt={`${BRAND.name} logo`} />
          <Form>
            <h2>Are you a {BRAND.name} employee?</h2>
          </Form>

          <div className="auth-actions">
            <button className="signup" onClick={this.NoBtn}>
              No
            </button>
            <button className="signin" onClick={this.Login}>
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
