import React from "react";
import {
  Modal,
  Table,
  Form,
  Card,
  Badge,
  Popover,
  Container,
  Row,
  Col,
  Button,
  DropdownButton,
  Dropdown,
  OverlayTrigger
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Tabs from "../Tabs/Tabs";
import socketIOClient from "socket.io-client";
import Swal from "sweetalert2";
import _ from "lodash";
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
      ref_person: [],
      btnHidden: true,
      labelHidden: false,
      dropdownHidden: true,
      origBtnHidden: false,
      dropdownTitle: "Change Status",
      review: "Reviewed",
      pending: "Pending Interview",
      final: "Final Interview",
      hired: "Hired",
      position_data: [],
      review_counter: 0,
      interview_counter: 0,
      final_counter: 0,
      slot: [],
      slot_counter: 0,
      setShow2: false,
      show2: false
    };
    socket = socketIOClient(this.state.endpoint);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleOpenAddPos = this.handleOpenAddPos.bind(this);
  }

  changeData = () => socket.emit("GetRefer");
  changePosition = () => socket.emit("GetPosition");

  componentDidMount() {
    socket.on("GetRefers", data => {
      console.log(data);

      this.setState({
        refs: data,
        review_counter: _.filter(data, { STATUS: "Reviewed" }).length,
        interview_counter: _.filter(data, { STATUS: "Pending Interview" })
          .length,
        final_counter: _.filter(data, { STATUS: "Final Interview" }).length
      });
    });
    socket.on("GetPositions", data => {
      console.log(data);
      data.map(slot => {
        return this.state.slot.push(slot.SLOT);
      });

      // console.log(_.add(this.state.slot));

      this.setState({
        position_data: data,
        slot_counter: this.state.slot.reduce((a, b) => a + b, 0)
      });
    });
  }

  handleOpen(x) {
    console.log(x);
    let found = this.state.refs.find(function(usid) {
      return usid.REF_ID === x;
    });

    this.setState({ setShow: true, ref_person: found });
  }
  handleOpenAddPos() {
    this.setState({ setShow2: true });
  }
  handleCloseAddPos = () => {
    this.setState({ setShow2: false });
  };

  handleSave() {
    console.log(this.state.ref_person.REF_ID);
    console.log(this.state.dropdownTitle);
    if (this.state.dropdownTitle !== "Change Status") {
      socket.emit(
        "UpdateStatus",
        this.state.ref_person.REF_ID,
        this.state.dropdownTitle
      );
      socket.on("change_data", this.changeData);
      Swal.fire({
        type: "success",
        title: "Update success!"
      });
      this.setState({
        labelHidden: false,
        dropdownHidden: true,
        btnHidden: true,
        origBtnHidden: false,
        dropdownTitle: "Change Status",
        setShow: false
      });
    } else {
      Swal.fire({
        type: "error",
        title: "Select a status!",
        text: "Change the status!"
      });
    }
  }

  handleClose = () => {
    this.setState({ setShow: false });
  };
  handleSearch(event) {
    this.setState({ search: event.target.value });
  }

  handleClickedUpdate = () => {
    this.setState({
      labelHidden: true,
      dropdownHidden: false,
      btnHidden: false,
      origBtnHidden: true
    });
  };

  handleCancelClicked = () => {
    this.setState({
      labelHidden: false,
      dropdownHidden: true,
      btnHidden: true,
      origBtnHidden: false,
      dropdownTitle: "Change Status"
    });
  };

  handleReviwed = () => {
    this.setState({ dropdownTitle: this.state.review });
  };
  handlePending = () => {
    this.setState({ dropdownTitle: this.state.pending });
  };
  handleFinal = () => {
    this.setState({ dropdownTitle: this.state.final });
  };
  handleHired = () => {
    this.setState({ dropdownTitle: this.state.hired });
  };

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
        ) !== -1 ||
        ref.STATUS.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    return (
      <div className="App">
        <h1>ERP SYSTEM</h1>
        <Tabs className="tabs">
          <div label="Overview">
            <div className="overview">
              <Container>
                <Row>
                  <Col>
                    <h3>Summary</h3>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Card
                      style={{
                        width: "100%",
                        height: "220px",
                        backgroundColor: "#171f32",
                        borderRadius: "12px",
                        color: "#cccfd3",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        fontFamily: "Trebuchet MS"
                        // borderColor: "#ff611d"
                      }}
                    >
                      <Card.Body>
                        <p style={{ fontSize: "40px" }}>Hiring Position</p>
                        <p style={{ fontSize: "80px" }}>
                          {this.state.position_data.length}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      style={{
                        width: "100%",
                        height: "220px",
                        backgroundColor: "#171f32",
                        borderRadius: "12px",
                        color: "#cccfd3",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        fontFamily: "Trebuchet MS"
                        // borderColor: "#ff611d"
                      }}
                    >
                      <Card.Body>
                        <p style={{ fontSize: "40px" }}>Candidates</p>
                        <p style={{ fontSize: "80px" }}>
                          {this.state.refs.length}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      style={{
                        width: "20rem",
                        height: "220px",
                        backgroundColor: "#171f32",
                        borderRadius: "12px",
                        color: "#cccfd3",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        fontFamily: "Trebuchet MS"
                        // borderColor: "#ff611d"
                      }}
                    >
                      <Card.Body>
                        <p style={{ fontSize: "40px" }}>Reviewed</p>
                        <p style={{ fontSize: "80px" }}>
                          {this.state.review_counter}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row className="row-class">
                  <Col>
                    <Card
                      style={{
                        width: "100%",
                        height: "220px",
                        backgroundColor: "#171f32",
                        borderRadius: "12px",
                        color: "#cccfd3",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        fontFamily: "Trebuchet MS"
                        // borderColor: "#ff611d"
                      }}
                    >
                      <Card.Body>
                        <p style={{ fontSize: "40px" }}>For Interview</p>
                        <p style={{ fontSize: "80px" }}>
                          {this.state.interview_counter}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      style={{
                        width: "100%",
                        height: "220px",
                        backgroundColor: "#171f32",
                        borderRadius: "12px",
                        color: "#cccfd3",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        fontFamily: "Trebuchet MS"
                        // borderColor: "#ff611d"
                      }}
                    >
                      <Card.Body>
                        <p style={{ fontSize: "40px" }}>Final Interview</p>
                        <p style={{ fontSize: "80px" }}>
                          {this.state.final_counter}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      style={{
                        width: "20rem",
                        height: "220px",
                        backgroundColor: "#171f32",
                        borderRadius: "12px",
                        color: "#cccfd3",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        fontFamily: "Trebuchet MS"
                        // borderColor: "#ff611d"
                      }}
                    >
                      <Card.Body>
                        <p style={{ fontSize: "40px" }}>Slots</p>
                        <p style={{ fontSize: "80px" }}>
                          {this.state.slot_counter}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <button onClick={this.handleOpenAddPos} className="addBtn">
                      Add Position
                    </button>
                  </Col>
                </Row>
              </Container>
            </div>
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
                    <th>Status</th>
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
                      <td>{ref.STATUS}</td>
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
          size="md"
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
                <Container>
                  <Row>
                    <Col style={{ textAlign: "left" }} sm={4}>
                      <Form.Label>Position</Form.Label>
                    </Col>
                    <Col style={{ textAlign: "left" }} sm={8}>
                      <Form.Label>{this.state.ref_person.POSITION}</Form.Label>
                    </Col>
                  </Row>
                </Container>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Container>
                  <Row>
                    <Col style={{ textAlign: "left" }} sm={4}>
                      <Form.Label>Contact</Form.Label>
                    </Col>
                    <Col style={{ textAlign: "left" }} sm={8}>
                      <Form.Label>
                        {this.state.ref_person.REF_CONTACT}
                      </Form.Label>
                    </Col>
                  </Row>
                </Container>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Container>
                  <Row>
                    <Col style={{ textAlign: "left" }} sm={4}>
                      <Form.Label>Address</Form.Label>
                    </Col>
                    <Col style={{ textAlign: "left" }} sm={8}>
                      <Form.Label>
                        {this.state.ref_person.REF_ADDRESS}
                      </Form.Label>
                    </Col>
                  </Row>
                </Container>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Container>
                  <Row>
                    <Col style={{ textAlign: "left" }} sm={4}>
                      <Form.Label>Referred by</Form.Label>
                    </Col>
                    <Col style={{ textAlign: "left" }} sm={8}>
                      <Form.Label>{this.state.ref_person.EMP_NAME}</Form.Label>
                    </Col>
                  </Row>
                </Container>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Container>
                  <Row>
                    <Col style={{ textAlign: "left" }} sm={4}>
                      <Form.Label>Status</Form.Label>
                    </Col>
                    <Col style={{ textAlign: "left" }} sm={8}>
                      <Form.Label hidden={this.state.labelHidden}>
                        {this.state.ref_person.STATUS}
                      </Form.Label>
                      <DropdownButton
                        hidden={this.state.dropdownHidden}
                        id="dropdown-item-button"
                        title={this.state.dropdownTitle}
                      >
                        <Dropdown.Item onClick={this.handleReviwed}>
                          {this.state.review}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={this.handlePending}>
                          {this.state.pending}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={this.handleFinal}>
                          {this.state.final}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={this.handleHired}>
                          {this.state.hired}
                        </Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Row>
                </Container>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="modal-body">
            <Container>
              <Row>
                <Col>
                  <Button
                    onClick={this.handleClose}
                    hidden={this.state.origBtnHidden}
                    variant="primary"
                    className="CloseBtn"
                    size="lg"
                  >
                    Close
                  </Button>
                  <Button
                    variant="secondary"
                    className="CloseBtn"
                    size="lg"
                    hidden={this.state.btnHidden}
                    onClick={this.handleCancelClicked}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    hidden={this.state.origBtnHidden}
                    onClick={this.handleClickedUpdate}
                    variant="secondary"
                    className="UpdateBtn"
                    size="lg"
                  >
                    Update
                  </Button>
                  <Button
                    variant="secondary"
                    className="SaveBtn"
                    size="lg"
                    hidden={this.state.btnHidden}
                    onClick={this.handleSave}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </Container>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.setShow2}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="modal"
        >
          <Modal.Header className="modal-header">
            <Modal.Title style={{ textAlign: "center" }}>
              <Container style={{ textAlign: "center" }}>
                <Row>
                  <Col>
                    <h2>Add Position</h2>
                  </Col>
                </Row>
              </Container>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <Form className="form-body">
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Container>
                  <Row>
                    <Col style={{ textAlign: "left" }} sm={4}>
                      <Form.Label>Position</Form.Label>
                    </Col>
                    <Col style={{ textAlign: "left" }} sm={8}>
                      <input type="text" />
                    </Col>
                  </Row>
                </Container>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Container>
                  <Row>
                    <Col style={{ textAlign: "left" }} sm={4}>
                      <Form.Label>Description</Form.Label>
                    </Col>
                    <Col style={{ textAlign: "left" }} sm={8}>
                      <input type="text" />
                    </Col>
                  </Row>
                </Container>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Container>
                  <Row>
                    <Col style={{ textAlign: "left" }} sm={4}>
                      <Form.Label>Slots</Form.Label>
                    </Col>
                    <Col style={{ textAlign: "left" }} sm={8}>
                      <input type="number" />
                    </Col>
                  </Row>
                </Container>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="modal-body">
            <Container>
              <Row>
                <Col>
                  <Button
                    onClick={this.handleCloseAddPos}
                    variant="primary"
                    className="CloseBtn"
                    size="lg"
                  >
                    Close
                  </Button>
                </Col>
                <Col>
                  <Button variant="secondary" className="UpdateBtn" size="lg">
                    Add
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
