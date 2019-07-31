import React from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import lago from "../1.png";
import contact from "../contact.png";

export default class Contact extends React.Component {
  render() {
    return (
      <div className="Body">
        <div className="message">
          <Container>
            <Row>
              <Col sm={8}>
                <Alert>
                  <Alert.Heading>
                    <p className="erp-head">CONTACT US</p>
                  </Alert.Heading>
                  <p>
                    LAGOTRONICS PHILIPPINES INC. <br /> Warehouse No. 5 Theme
                    Builders Compound, Sitio Cubol Brgy. Sapalibutad Angeles
                    City 2009, Pampanga Philippines
                  </p>
                  {/* <hr />
                  <p className="mb-0">
                    Contact Us: Reach us, let us know what you need
                    <br />
                    +63.45.624.7098 <br />
                    +63.05.675.2015
                  </p>
                  <p>
                    <br />
                    Useful Links <br /> www.lagotronics.ph •
                    www.lagotronicsprojects.com
                  </p> */}
                </Alert>
              </Col>

              <Col sm={4}>
                <img src={contact} alt="Logo" />
              </Col>
            </Row>
          </Container>
        </div>
        <hr style={{ border: ".5px solid #ff611d" }} />
        <Container>
          <Row>
            <Col sm>
              <img src={lago} alt="Logo" />
            </Col>
            <Col
              sm
              style={{
                textAlign: "left",
                fontFamily: "Trebuchet MS",
                color: "white"
              }}
            >
              <p>Contact Us</p>
              <br />
              <p>
                {" "}
                +63.45.624.7098 <br />
                +63.05.675.2015
              </p>
            </Col>
            <Col
              sm
              style={{
                textAlign: "left",
                fontFamily: "Trebuchet MS",
                color: "white"
              }}
            >
              <p>Useful Links</p>
              <br />
              <p>
                {" "}
                www.lagotronics.ph <br />
                www.lagotronicsprojects.com
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
