import React from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import logo from "../brand-logo.svg";
import contact from "../contact.png";
import "../css/contact.css";
import BRAND from "../../config/brand";

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
                    {BRAND.legalName}
                    <br />
                    {BRAND.contact.addressLines.map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                    {BRAND.contact.email}
                  </p>
                </Alert>
              </Col>

              <Col sm={4}>
                <img className="contact-img" src={contact} alt="Contact" />
              </Col>
            </Row>
          </Container>
        </div>
        <hr className="contact-divider" />
        <Container>
          <Row>
            <Col sm>
              <img className="contact-logo" src={logo} alt={`${BRAND.name} logo`} />
            </Col>
            <Col sm className="contact-col">
              <p>Contact Us</p>
              <br />
              <p>
                {BRAND.contact.phones.map((phone, i) => (
                  <React.Fragment key={i}>
                    {phone}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </Col>
            <Col sm className="contact-col">
              <p>Useful Links</p>
              <br />
              <p>
                {BRAND.contact.links.map((link, i) => (
                  <React.Fragment key={i}>
                    {link}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
