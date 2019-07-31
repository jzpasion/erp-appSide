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
                    Generally, the value of referral incentives ranges from P500
                    for entry-level positions and for the admin position will
                    get P1000, For every successful candidate that you refer you
                    will get 1000, (until he/she will stay for 3 months in the
                    company)
                  </p>
                </Alert>
              </Col>

              <Col sm={4}>
                <img src={logo} alt="Logo" />
              </Col>
            </Row>
          </Container>
        </div>

        <div className="footer">
          <p>
            All rights reserved 2019 | © Develop by: Jeremiah Zyrel Pasion •
            Mark Wiliz | Lagotronics Philippines Inc.
          </p>
        </div>
      </div>
    );
  }
}
