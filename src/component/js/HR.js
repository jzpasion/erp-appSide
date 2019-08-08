import React from "react";
import {
  Modal,
  Table,
  Form,
  Card,
  Badge,
  Container,
  Row,
  Col,
  Button,
  DropdownButton,
  Dropdown
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
      show2: false,
      isHovering: false,
      isHovering2: false,
      indicatorHidden: false,
      indicatorHidden2: false,
      position_input: "",
      description_input: "",
      slot_input: 0,
      deleteLabelhidden: false,
      deleteBtnhidden: false,
      deleteLabelhidden2: true,
      deleteBtnhidden2: true,
      titleModal: "Add Postion",
      dropdownTitle2: "Select Position",
      setShow3: false,
      show3: false
    };
    socket = socketIOClient(this.state.endpoint);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleOpenAddPos = this.handleOpenAddPos.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseHover2 = this.handleMouseHover2.bind(this);
    this.handlePosition = this.handlePosition.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSlot = this.handleSlot.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleDeleteRefs = this.handleDeleteRefs.bind(this);
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

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }
  handleMouseHover2() {
    this.setState(this.toggleHoverState2);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
      indicatorHidden: !state.indicatorHidden
    };
  }
  toggleHoverState2(state) {
    return {
      isHovering2: !state.isHovering2,
      indicatorHidden2: !state.indicatorHidden2
    };
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
    this.setState({
      setShow2: false,
      position_input: "",
      description_input: "",
      slot_input: 0
    });
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

  handlePosition(event) {
    this.setState({ position_input: event.target.value });
  }
  handleDescription(event) {
    this.setState({ description_input: event.target.value });
  }
  handleSlot(event) {
    this.setState({ slot_input: event.target.value });
  }
  handleAddPosition = () => {
    if (
      this.state.position_input !== "" &&
      this.state.description_input !== ""
    ) {
      socket.emit(
        "AddPosition",
        this.state.position_input,
        this.state.description_input,
        this.state.slot_input
      );
      socket.on("change_data", this.changePosition);
      Swal.fire({
        type: "success",
        title: " " + this.state.position_input + " Added!"
      });
      this.setState({
        setShow2: false,
        position_input: "",
        description_input: "",
        slot_input: 0
      });
    } else {
      Swal.fire({
        type: "error",
        title: "Attention!",
        text: "Please fill all required fields!"
      });
    }
  };

  handleCancel = () => {
    this.setState({
      deleteLabelhidden: false,
      deleteBtnhidden: false,
      deleteLabelhidden2: true,
      deleteBtnhidden2: true,
      titleModal: "Add Position",
      dropdownTitle2: "Select Position"
    });
  };
  handleDelete = () => {
    this.setState({
      deleteLabelhidden: true,
      deleteBtnhidden: true,
      deleteLabelhidden2: false,
      deleteBtnhidden2: false,
      titleModal: "Delete Position"
    });
  };

  handleChangeTitle(pos) {
    this.setState({ dropdownTitle2: pos });
  }
  handleDeleteSave = () => {
    if (this.state.dropdownTitle2 !== "Select Position") {
      socket.emit("DeletePosition", this.state.dropdownTitle2);
      socket.on("change_data", this.changePosition);
      Swal.fire({
        type: "success",
        title: " " + this.state.dropdownTitle2 + " Deleted!"
      });
    } else {
      Swal.fire({
        type: "error",
        title: "Attention!",
        text: "Please select a Position inside the dropdown!"
      });
    }
    this.setState({ setShow2: false, dropdownTitle2: "Select Position" });
  };
  closeUpdate = () => {
    this.setState({
      setShow3: false,
      slot_input: 0,
      titleModal: "Add Slot",
      setShow2: true,
      dropdownTitle2: "Select Position"
    });
  };
  openUpdate = () => {
    this.setState({
      setShow3: true,
      setShow2: false,
      titleModal: "Update Slot"
    });
  };

  handleUpdate = () => {
    console.log(this.state.dropdownTitle2);
    console.log(this.state.slot_input);

    if (this.state.dropdownTitle2 !== "Select Position") {
      socket.emit(
        "UpdateSlot",
        this.state.dropdownTitle2,
        this.state.slot_input
      );
      socket.on("change_data", this.changePosition);

      Swal.fire({
        type: "success",
        title: "Slot Updated!"
      });
      this.setState({
        dropdownTitle2: "Select Position",
        slot_input: 0,
        setShow3: false,
        setShow2: true
      });
    } else {
      Swal.fire({
        type: "error",
        title: "Attention!",
        text: "Please select a Position inside the dropdown!"
      });
    }
  };

  handleDeleteRefs() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      })
      .then(result => {
        if (result.value) {
          console.log(this.state.ref_person.REF_ID);
          socket.emit("DeleteRef", this.state.ref_person.REF_ID);
          socket.on("change_data", this.changeData);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          this.setState({ setShow: false });
        } else if (
          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire("Cancelled", "", "error");
        }
      });
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
        ) !== -1 ||
        ref.STATUS.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    return (
      <div className="App">
        <h1>EMPLOYEE REFERRAL PROGRAM SYSTEM</h1>
        <Tabs className="tabs">
          <div label="Overview">
            <div className="overview">
              <Container>
                <Row>
                  <Col>
                    <h3 style={{ color: "#cccfd3" }}>Summary</h3>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Card
                      onMouseEnter={this.handleMouseHover}
                      onMouseLeave={this.handleMouseHover}
                      style={{
                        width: "100%",
                        height: "220px",
                        backgroundColor: "#171f32",
                        borderRadius: "12px",
                        color: "#cccfd3",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        fontFamily: "Trebuchet MS",
                        position: "relative",
                        zIndex: "1",
                        overflow: "hidden",
                        TextAlign: "center"
                        // borderColor: "#ff611d"
                      }}
                    >
                      <Card.Body className="hiring_static">
                        <p
                          hidden={this.state.indicatorHidden}
                          style={{ fontSize: "40px" }}
                        >
                          Hiring Position
                        </p>
                        <p
                          hidden={this.state.indicatorHidden}
                          style={{ fontSize: "80px" }}
                        >
                          {this.state.position_data.length}
                        </p>
                        {this.state.isHovering && (
                          <div>
                            <Card className="poshead">
                              {this.state.position_data.map(ref => (
                                <Card.Header
                                  className="posbody"
                                  key={ref.POS_ID}
                                >
                                  {ref.POSITION}
                                </Card.Header>
                              ))}
                            </Card>
                          </div>
                        )}
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
                      onMouseEnter={this.handleMouseHover2}
                      onMouseLeave={this.handleMouseHover2}
                      style={{
                        width: "20rem",
                        height: "220px",
                        backgroundColor: "#171f32",
                        borderRadius: "12px",
                        color: "#cccfd3",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        fontFamily: "Trebuchet MS",
                        position: "relative",
                        overflow: "hidden",
                        zIndex: "1"
                        // borderColor: "#ff611d"
                      }}
                    >
                      <Card.Body className="hiring_static">
                        <p
                          hidden={this.state.indicatorHidden2}
                          style={{ fontSize: "40px" }}
                        >
                          Slots
                        </p>
                        <p
                          hidden={this.state.indicatorHidden2}
                          style={{ fontSize: "80px" }}
                        >
                          {this.state.slot_counter}
                        </p>
                        {this.state.isHovering2 && (
                          <div>
                            <Card className="poshead">
                              {this.state.position_data.map(ref => (
                                <Card.Header
                                  className="posbody"
                                  key={ref.POS_ID}
                                >
                                  <Container>
                                    <Row>
                                      <Col sm={8}>{ref.POSITION}</Col>
                                      <Col sm={4}>
                                        <Badge variant="light">
                                          {ref.SLOT}
                                        </Badge>
                                      </Col>
                                    </Row>
                                  </Container>
                                </Card.Header>
                              ))}
                            </Card>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <button onClick={this.handleOpenAddPos} className="addBtn">
                      Position Settings
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

              <Table
                responsive="md"
                className="table-div"
                align="center"
                size="sm"
              >
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
                <Col hidden={this.state.origBtnHidden}>
                  <Button
                    variant="secondary"
                    className="DeleteBtn"
                    size="lg"
                    hidden={this.state.origBtnHidden}
                    onClick={this.handleDeleteRefs}
                  >
                    Delete
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
                    <h2>{this.state.titleModal}</h2>
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
                      <input
                        hidden={this.state.deleteLabelhidden}
                        onChange={this.handlePosition}
                        value={this.state.position_input}
                        type="text"
                      />
                      <DropdownButton
                        id="dropdown-basic-button"
                        title={this.state.dropdownTitle2}
                        hidden={this.state.deleteLabelhidden2}
                      >
                        {this.state.position_data.map(pos => (
                          <Dropdown.Item
                            key={pos.POS_ID}
                            onClick={() => {
                              this.handleChangeTitle(pos.POSITION);
                            }}
                          >
                            {pos.POSITION}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </Col>
                  </Row>
                </Container>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Container>
                  <Row>
                    <Col style={{ textAlign: "left" }} sm={4}>
                      <Form.Label hidden={this.state.deleteLabelhidden}>
                        Description
                      </Form.Label>
                    </Col>
                    <Col style={{ textAlign: "left" }} sm={8}>
                      <input
                        hidden={this.state.deleteLabelhidden}
                        onChange={this.handleDescription}
                        value={this.state.description_input}
                        type="text"
                      />
                    </Col>
                  </Row>
                </Container>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Container>
                  <Row>
                    <Col style={{ textAlign: "left" }} sm={4}>
                      <Form.Label hidden={this.state.deleteLabelhidden}>
                        Slots
                      </Form.Label>
                    </Col>
                    <Col style={{ textAlign: "left" }} sm={8}>
                      <input
                        hidden={this.state.deleteLabelhidden}
                        onChange={this.handleSlot}
                        value={this.state.slot_input}
                        type="number"
                      />
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
                    hidden={this.state.deleteBtnhidden}
                    onClick={this.handleCloseAddPos}
                    variant="primary"
                    className="CloseBtn"
                    size="lg"
                  >
                    Close
                  </Button>
                  <Button
                    hidden={this.state.deleteBtnhidden2}
                    onClick={this.handleCancel}
                    variant="secondary"
                    className="CloseBtn"
                    size="lg"
                  >
                    Cancel
                  </Button>
                </Col>
                <Col hidden={this.state.deleteBtnhidden}>
                  <Button
                    hidden={this.state.deleteBtnhidden}
                    onClick={this.handleDelete}
                    variant="secondary"
                    className="DeleteBtn"
                    size="lg"
                  >
                    Delete
                  </Button>
                </Col>
                <Col>
                  <Button
                    hidden={this.state.deleteBtnhidden}
                    onClick={this.handleAddPosition}
                    variant="secondary"
                    className="AddingBtn"
                    size="lg"
                  >
                    Add
                  </Button>
                  <Button
                    hidden={this.state.deleteBtnhidden2}
                    onClick={this.handleDeleteSave}
                    variant="secondary"
                    className="SaveBtn"
                    size="lg"
                  >
                    Save
                  </Button>
                </Col>
              </Row>
              <Row hidden={this.state.deleteBtnhidden}>
                <Col>
                  <button
                    style={{ marginTop: "1.5%" }}
                    onClick={this.openUpdate}
                    hidden={this.state.deleteBtnhidden}
                    className="UpdateBtn"
                  >
                    Update Slot
                  </button>
                </Col>
              </Row>
            </Container>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.setShow3}
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
                    <h2>{this.state.titleModal}</h2>
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
                      <DropdownButton
                        id="dropdown-basic-button"
                        title={this.state.dropdownTitle2}
                      >
                        {this.state.position_data.map(pos => (
                          <Dropdown.Item
                            key={pos.POS_ID}
                            onClick={() => {
                              this.handleChangeTitle(pos.POSITION);
                            }}
                          >
                            {pos.POSITION}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
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
                      <input
                        onChange={this.handleSlot}
                        value={this.state.slot_input}
                        type="number"
                      />
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
                    onClick={this.closeUpdate}
                    variant="primary"
                    className="CloseBtn"
                    size="lg"
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    onClick={this.handleUpdate}
                    variant="secondary"
                    className="SaveBtn"
                    size="lg"
                  >
                    Save
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
