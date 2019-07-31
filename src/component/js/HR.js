import React from "react";
import {
  Modal,
  Table,
  Form,
  Jumbotron,
  Container,
  Row,
  Col,
  Button
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Tabs from "../Tabs/Tabs";
import socketIOClient from "socket.io-client";
require("../Tabs/style.css");
require("../css/HR.css");

var socket;
class HrTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://192.168.1.40:8080",
      refs: [],
      search: "",
      setShow: false,
      show: false,
      ref_person: []
    };
    socket = socketIOClient(this.state.endpoint);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }
  changeData = () => socket.emit("GetRefer");

  componentDidMount() {
    socket.on("GetRefers", data => {
      console.log(data);

      this.setState({ refs: data });
    });
    // console.log(this.state.get_users);
  }
  handleOpen(x) {
    console.log(x);
    let found = this.state.refs.find(function(usid) {
      return usid.REF_ID === x;
    });

    this.setState({ setShow: true, ref_person: found });
  }

  handleClose = () => {
    this.setState({ setShow: false });
  };
  handleSearch(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    let filteredRefs = this.state.refs.filter(ref => {
      return (
        ref.REF_LAST_NAME.toLowerCase().indexOf(
          this.state.search.toLowerCase()
        ) !== -1 ||
        ref.REF_FIRST_NAME.toLowerCase().indexOf(
          this.state.search.toLowerCase()
        ) !== -1 ||
        ref.POSITION.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1 ||
        ref.REF_ADDRESS.toLowerCase().indexOf(
          this.state.search.toLowerCase()
        ) !== -1
      );
    });
    return (
      <div className="App">
        <h1>ERP SYSTEM</h1>
        <Tabs className="tabs">
          <div label="Overview">
            <div className="overview">
              <Jumbotron fluid>
                <Container>
                  <Row>
                    <Col xs={6} md={4} style={{ backgroundColor: "blue" }}>
                      xs=6 md=4
                    </Col>
                    <Col xs={12} md={8}>
                      xs=12 md=8
                    </Col>
                  </Row>
                </Container>
              </Jumbotron>
            </div>
          </div>
          <div className="job_overview" label="Job Overview">
            <div className="job_overview" />
          </div>
          <div className="candidates" label="Candidates">
            <div className="candidates">
              <div className="search">
                <input
                  value={this.state.search}
                  onChange={this.handleSearch}
                  type="text"
                  placeholder="Search"
                />
              </div>
              <Form className="radios">
                <Form.Check
                  style={{ color: "red" }}
                  custom
                  inline
                  label="HR Assistant"
                  type="checkbox"
                  id={`custom-inline-radio-1`}
                />
                <Form.Check
                  style={{ color: "red" }}
                  custom
                  inline
                  label="Accounting"
                  type="checkbox"
                  id={`custom-inline-radio-2`}
                />
                <Form.Check
                  style={{ color: "red" }}
                  custom
                  inline
                  label="testFilter"
                  type="checkbox"
                  id={`custom-inline-radio-3`}
                />
              </Form>

              <Table className="table-div" align="center" size="sm">
                <thead style={{ color: "#ffffff" }}>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Referred by</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRefs.map(ref => (
                    <tr
                      className="test"
                      onClick={() => this.handleOpen(ref.REF_ID)}
                      key={ref.REF_ID}
                    >
                      <td>
                        {ref.REF_LAST_NAME} , {ref.REF_FIRST_NAME}
                      </td>
                      <td>{ref.POSITION}</td>
                      <td>{ref.REF_CONTACT}</td>
                      <td>{ref.REF_ADDRESS}</td>
                      <td>{ref.EMP_NAME}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Tabs>
        <Modal
          show={this.state.setShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="modal"
        >
          <Modal.Header className="modal-header">
            <Modal.Title style={{ textAlign: "center" }}>
              <Container style={{ textAlign: "center" }}>
                <Row>
                  <Col>
                    <h2>
                      {this.state.ref_person.REF_LAST_NAME},
                      {this.state.ref_person.REF_FIRST_NAME}
                    </h2>
                  </Col>
                </Row>
              </Container>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <Form className="form-body">
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="6">
                  Position
                </Form.Label>
                <Form.Label column sm="10">
                  {this.state.ref_person.POSITION}
                </Form.Label>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Contact
                </Form.Label>
                <Form.Label column sm="2">
                  {this.state.ref_person.REF_CONTACT}
                </Form.Label>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Address
                </Form.Label>
                <Form.Label column sm="2">
                  {this.state.ref_person.REF_ADDRESS}
                </Form.Label>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Referred by
                </Form.Label>
                <Form.Label column sm="2">
                  {this.state.ref_person.EMP_NAME}
                </Form.Label>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Status
                </Form.Label>
                <Form.Label column sm="2">
                  {this.state.ref_person.EMP_NAME}
                </Form.Label>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="modal-body">
            <Container>
              <Row>
                <Col>
                  <Button
                    onClick={this.handleClose}
                    variant="primary"
                    className="CloseBtn"
                    size="lg"
                  >
                    Close
                  </Button>
                </Col>
                <Col>
                  <Button variant="secondary" className="DeleteBtn" size="lg">
                    Delete
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
export default HrTabs;
