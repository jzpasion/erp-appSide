import React from "react";
import { Form, Container, Col, Row } from "react-bootstrap";
import logo from "../1.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import "../css/loginHR.css";
// var socket;
class HRLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
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

  Login = () => {
    console.log(this.state.username);
    console.log(this.state.password);
    if (
      this.state.username === "HRadmin" &&
      this.state.password === "hradmin1234"
    ) {
      this.setState({ password: "", username: "" });
      this.props.history.push("/6RXYPvzzDGiNphnUrytD");
    } else {
      Swal.fire({
        type: "error",
        title: "Invalid Username/Password!"
      });
      this.setState({ password: "", username: "" });
    }
  };
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <div className="hrlogin">
                <img src={logo} alt="Logo" />
                <Form>
                  <Form.Group>
                    <input
                      value={this.state.username}
                      onChange={this.handleUsername}
                      className="user"
                      type="text"
                      placeholder="Username"
                    />
                  </Form.Group>

                  <Form.Group>
                    <input
                      onChange={this.handlePassword}
                      value={this.state.password}
                      className="user"
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                </Form>

                <button className="signup" onClick={this.NoBtn}>
                  Cancel
                </button>
                <button className="signin" onClick={this.Login}>
                  Sign In
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HRLogin;
