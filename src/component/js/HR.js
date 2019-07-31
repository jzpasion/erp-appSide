import React from "react";
import { Jumbotron, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Tabs from "../Tabs/Tabs";
require("../Tabs/style.css");
require("../css/HR.css");

class HrTabs extends React.Component {
  render() {
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
              <Jumbotron fluid>
                <Container>
                  <Row>
                    <Col xs={6} md={4} style={{ backgroundColor: "blue" }}>
                      xs=6 md=4
                    </Col>
                    <Col xs={12} md={8}>
                      <Card body>This is some text within a card body.</Card>
                    </Col>
                  </Row>
                </Container>
              </Jumbotron>
            </div>
          </div>
        </Tabs>
      </div>
    );
  }
}
export default HrTabs;
