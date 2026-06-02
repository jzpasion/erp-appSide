import React from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import logo from "../2.png";
require("../css/aboutERP.css");

export default class AboutERP extends React.Component {
  render() {
    return (
      <div className="Body">
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
                  <br />
                  <p>
                    Referral incentives vary depending on the role. For every
                    successful candidate you refer, you'll receive a cash reward
                    once they complete three months with the company. Speak with
                    HR for the current incentive amounts.
                  </p>
                </Alert>
              </Col>

              <Col sm={4}>
                <img src={logo} alt="Employee referral program" />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
