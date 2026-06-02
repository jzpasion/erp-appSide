import React from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import BRAND from "../../config/brand";

export default class AboutCompany extends React.Component {
  render() {
    return (
      <div className="Body">
        <div className="message">
          <Container>
            <Row>
              <Col>
                <Alert>
                  <Alert.Heading>
                    <p className="erp-head">ABOUT {BRAND.name.toUpperCase()}</p>
                  </Alert.Heading>
                  {BRAND.about.map((paragraph, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <hr />}
                      <p className="mb-0">{paragraph}</p>
                    </React.Fragment>
                  ))}
                </Alert>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
