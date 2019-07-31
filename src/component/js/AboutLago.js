import React from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import logo from "../head.jpg";
export default class AboutLago extends React.Component {
  render() {
    return (
      <div className="Body">
        <div className="message" style={{ textAlign: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              borderRadius: "500px",
              width: "1000px",
              height: "400px"
            }}
          />
          <Container>
            <Row>
              <Col>
                <Alert>
                  <Alert.Heading>
                    <p className="erp-head">ABOUT LAGOTRONICS</p>
                  </Alert.Heading>
                  <p style={{ alignSelf: "left" }}>
                    Lagotronics Projects has been creating unforgettable
                    memories since 1979. Having started out in the audio and
                    lighting business, today we create interactive experiences
                    for theme parks, museums, amusement parks, waterparks and
                    shopping malls.
                  </p>
                  <hr />
                  <p className="mb-0">
                    We have been pioneers since our earliest beginnings,
                    providing innovative solutions in the field of interactive
                    systems, game development, audio, video, lighting, show
                    control, Virtual and Augmented Reality. We don’t just push
                    boundaries – we break through them.
                  </p>
                  <hr />
                  <p className="mb-0">
                    Working all around the world with state-of-the-art
                    technology always offers great opportunities. And luckily,
                    at Lagotronics Projects we love a good challenge.
                  </p>
                  <hr />
                  <p className="mb-0">
                    Our strength is in knowledge, innovation, customized
                    solutions and out-of-the-box thinking. This resulted in many
                    great dark rides, outdoor rides, upgrades, museum
                    experiences, AV and lighting projects and much more!
                  </p>
                </Alert>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
