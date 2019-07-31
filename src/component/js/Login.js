import React from "react";
import "../css/login.css";
import { Form, Container, Col, Row } from "react-bootstrap";
import logo from "../1.png";
import "bootstrap/dist/css/bootstrap.min.css";
// import socketIOClient from "socket.io-client";
import Swal from "sweetalert2";

// var socket;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // endpoint: "http://192.168.1.40:8080",
    };
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
      <div className="App">
        <Container>
          <Row>
            <Col>
              <div className="login">
                <img src={logo} alt="Logo" />
                <Form>
                  <h2 style={{ color: "#ff611d" }}>
                    Are you a Lagotronics employee?
                  </h2>
                </Form>

                <button className="signup" onClick={this.NoBtn}>
                  No
                </button>
                <button className="signin" onClick={this.Login}>
                  Yes
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
