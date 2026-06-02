import React from "react";
import { Form } from "react-bootstrap";
import logo from "../brand-logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import axios from "axios";
import "../css/loginHR.css";
import BRAND from "../../config/brand";

// Backend base URL (same one the dashboards use for sockets).
const API = process.env.REACT_APP_SOCKET_ENDPOINT || "http://localhost:8080";

class HRLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  NoBtn = () => {
    this.props.history.push("/");
  };

  fail = () => {
    Swal.fire({
      type: "error",
      title: "Invalid Username/Password!"
    });
    this.setState({ password: "", username: "" });
  };

  // Credentials are verified by the backend (see ServerSide /api/user/login).
  // They are never compared here, so the password is not exposed in the bundle.
  Login = async () => {
    if (this.state.loading) return;
    this.setState({ loading: true });
    try {
      const res = await axios.post(`${API}/api/user/login`, {
        username: this.state.username,
        password: this.state.password
      });
      if (res.data && res.data.success) {
        this.setState({ password: "", username: "", loading: false });
        this.props.history.push("/6RXYPvzzDGiNphnUrytD");
      } else {
        this.setState({ loading: false });
        this.fail();
      }
    } catch (error) {
      // 401 (bad credentials) or network error
      this.setState({ loading: false });
      this.fail();
    }
  };

  handleKeyDown = event => {
    if (event.key === "Enter") this.Login();
  };

  render() {
    return (
      <div className="auth-page">
        <div className="hrlogin">
          <img src={logo} alt={`${BRAND.name} logo`} />
          <Form>
            <Form.Group>
              <input
                value={this.state.username}
                onChange={this.handleUsername}
                onKeyDown={this.handleKeyDown}
                className="user"
                type="text"
                placeholder="Username"
              />
            </Form.Group>

            <Form.Group>
              <input
                onChange={this.handlePassword}
                onKeyDown={this.handleKeyDown}
                value={this.state.password}
                className="user"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
          </Form>

          <div className="auth-actions">
            <button className="signup" onClick={this.NoBtn}>
              Cancel
            </button>
            <button
              className="signin"
              onClick={this.Login}
              disabled={this.state.loading}
            >
              {this.state.loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default HRLogin;
