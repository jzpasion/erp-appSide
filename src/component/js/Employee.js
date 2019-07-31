import React from "react";
import socketIOClient from "socket.io-client";
import {
  Alert,
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/employee.css";
import logo from "../2.png";
import HR from "../hri.png";
import ACC from "../acc.png";
import CODE from "../code.png";
import Swal from "sweetalert2";

var socket;
export default class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      setShow: false,
      position: "",
      endpoint: "http://192.168.1.40:8080",
      emp_name: "",
      ref_lname: "",
      ref_fname: "",
      ref_add: "",
      ref_contact: "",
      ref_email: ""
    };
    socket = socketIOClient(this.state.endpoint);
    this.empNameHandleChange = this.empNameHandleChange.bind(this);
    this.refLastHandleChange = this.refLastHandleChange.bind(this);
    this.refFirstHandleChange = this.refFirstHandleChange.bind(this);
    this.refAddHandleChange = this.refAddHandleChange.bind(this);
    this.refContactHandleChange = this.refContactHandleChange.bind(this);
    this.refEmailHandleChange = this.refEmailHandleChange.bind(this);
  }

  changeData = () => socket.emit("GetRefer");

  empNameHandleChange(event) {
    this.setState({ emp_name: event.target.value });
  }
  refLastHandleChange(event) {
    this.setState({ ref_lname: event.target.value });
  }
  refFirstHandleChange(event) {
    this.setState({ ref_fname: event.target.value });
  }
  refAddHandleChange(event) {
    this.setState({ ref_add: event.target.value });
  }
  refContactHandleChange(event) {
    this.setState({ ref_contact: event.target.value });
  }
  refEmailHandleChange(event) {
    this.setState({ ref_email: event.target.value });
  }

  card1ModalOpen = () => {
    this.setState({ setShow: true, position: "HR Assistant" });
    console.log("hello");
  };

  card2ModalOpen = () => {
    this.setState({ setShow: true, position: "Accounting" });
    console.log("hello");
  };

  card1ModalClose = () => {
    this.setState({
      setShow: false,
      position: "",
      emp_name: "",
      ref_lname: "",
      ref_fname: "",
      ref_add: "",
      ref_contact: "",
      ref_email: ""
    });
  };

  referButton = () => {
    console.log(this.state.position);
    console.log(this.state.ref_lname);
    console.log(this.state.ref_fname);
    console.log(this.state.ref_contact);
    console.log(this.state.ref_email);
    console.log(this.state.ref_add);
    console.log(this.state.emp_name);
    if (
      this.state.position !== "" &&
      this.state.ref_fname !== "" &&
      this.state.ref_lname !== "" &&
      this.state.emp_name !== "" &&
      this.state.ref_add !== "" &&
      this.state.ref_contact !== "" &&
      this.state.ref_email !== ""
    ) {
      socket.emit(
        "AddRefer",
        this.state.emp_name,
        this.state.ref_lname,
        this.state.ref_fname,
        this.state.ref_add,
        this.state.ref_contact,
        this.state.ref_email,
        this.state.position
      );
      socket.on("change_data", this.changeData);

      Swal.fire({
        type: "success",
        title: "Add Success!",
        text: "Thank you!"
      });

      this.setState({
        emp_name: "",
        ref_lname: "",
        ref_fname: "",
        ref_add: "",
        ref_contact: "",
        ref_email: ""
      });
    } else {
      Swal.fire({
        type: "error",
        title: "Oops..(✖﹏✖)",
        text: "Please fill all required fields!"
      });
    }
  };

  render() {
    return (
      <div className="Emp">
        <div className="message">
          <Container>
            <Row>
              <Col sm={8}>
                <Alert>
                  <Alert.Heading>
                    <p className="erp-head">
                      EMPLOYEE <br /> REFERAL PROGRAM
                    </p>
                  </Alert.Heading>
                  <p>
                    An employee referral program is organized and structured
                    program employers use to ask existing employees to recommend
                    candidates for open positions. Unlike sourcing, employee
                    referral is an internal method used to find and hire the
                    best talent from employees' existing networks.
                  </p>
                  <hr />
                </Alert>
              </Col>

              <Col sm={4}>
                <img src={logo} alt="Logo" />
              </Col>
            </Row>
          </Container>
        </div>
        <hr style={{ border: "1px solid #ff611d" }} />
        <Container>
          <Row>
            <Col>
              <Card
                className="card1"
                style={{
                  width: "20rem",
                  height: "350px",
                  backgroundColor: "#171f32",
                  borderRadius: "12px",
                  color: "#cccfd3",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  backgroundImage: "../hr.png",
                  fontFamily: "Trebuchet MS"
                  // borderColor: "#ff611d"
                }}
              >
                <Card.Img variant="top" src={HR} height="100px" />
                <Card.Body>
                  <Card.Title>HR Assistant</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Lorem Ipsum
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>

                  <button
                    onClick={this.card1ModalOpen}
                    className="button button1"
                  >
                    I Know Somebody
                  </button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                className="card2"
                style={{
                  width: "20rem",
                  height: "350px",
                  backgroundColor: "#171f32",
                  borderRadius: "12px",
                  color: "#cccfd3",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  fontFamily: "Trebuchet MS"
                  // borderColor: "#ff611d"
                }}
              >
                <Card.Img variant="top" src={ACC} height="100px" />
                <Card.Body>
                  <Card.Title>Acounting</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Lorem Ipsum
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>

                  <button
                    onClick={this.card2ModalOpen}
                    className="button button1"
                  >
                    I Know Somebody
                  </button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                className="card3"
                style={{
                  width: "20rem",
                  height: "350px",
                  backgroundColor: "#171f32",
                  borderRadius: "12px",
                  color: "#cccfd3",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  fontFamily: "Trebuchet MS"
                  // borderColor: "#ff611d"
                }}
              >
                {" "}
                <Card.Img variant="top" src={CODE} height="100px" />
                <Card.Body>
                  <Card.Title>Lorem</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Lorem Ipsum
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>

                  <button
                    onClick={this.card1ModalOpen}
                    className="button button1"
                  >
                    I Know Somebody
                  </button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer">
          <p>
            Warehouse No. 5 Theme Builders Compound, Sitio Cubol Brgy.
            Sapalibutad Angeles City 2009, Pampanga Philippines +63.45.624.7098
            • +63.05.675.2015 • www.lagotronics.ph • www.lagotronicsprojects.com
          </p>
        </div>
        <Modal
          show={this.state.setShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="modal"
        >
          <Modal.Header className="modal-header">
            <Modal.Title align="center">
              <h3>EMPLOYEE REFERRAL PROGRAM</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <Container>
              <Row>
                <Col xs={6} md={4}>
                  Postion:
                </Col>
                <Col xs={12} md={8}>
                  <input type="text" value={this.state.position} disabled />
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={4}>
                  Last Name:
                </Col>
                <Col xs={12} md={8}>
                  <input
                    type="text"
                    value={this.state.ref_lname}
                    onChange={this.refLastHandleChange}
                    placeholder="Last Name"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={4}>
                  First Name:
                </Col>
                <Col xs={12} md={8}>
                  <input
                    type="text"
                    value={this.state.ref_fname}
                    onChange={this.refFirstHandleChange}
                    placeholder="First Name"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={4}>
                  Contact:
                </Col>
                <Col xs={12} md={8}>
                  <input
                    type="text"
                    value={this.state.ref_contact}
                    onChange={this.refContactHandleChange}
                    placeholder="Contact"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col xs={6} md={4}>
                      Email:
                    </Col>
                    <Col xs={12} md={8}>
                      <input
                        type="text"
                        value={this.state.ref_email}
                        onChange={this.refEmailHandleChange}
                        placeholder="Email"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={4}>
                  Address:
                </Col>
                <Col xs={12} md={8}>
                  <input
                    type="text"
                    value={this.state.ref_add}
                    onChange={this.refAddHandleChange}
                    placeholder="Address"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={4}>
                  Referred By:
                </Col>
                <Col xs={12} md={8}>
                  <input
                    type="text"
                    value={this.state.emp_name}
                    onChange={this.empNameHandleChange}
                    placeholder="Employee Name"
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer className="modal-body">
            <Container>
              <Row>
                <Col>
                  <Button
                    onClick={this.card1ModalClose}
                    variant="primary"
                    className="CloseBtn"
                    size="lg"
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    onClick={this.referButton}
                    variant="secondary"
                    className="ReferBtn"
                    size="lg"
                  >
                    Refer
                  </Button>
                </Col>
              </Row>
            </Container>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
