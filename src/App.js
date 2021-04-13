import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactMarkdown from "react-markdown";
import FillerText from "./data/filler";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";

import "./App.css";

const App = () => {
  const [input, setInput] = useState(FillerText);

  return (
    <Container fluid style={{ minHeight: "100vh" }}>
      <Row>
        <Col xs={12} style={{ padding: "0" }}>
          <Navbar expand="lg" variant="dark" bg="primary">
            <Navbar.Brand href="#">Joplin WEB</Navbar.Brand>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col
          xs={2}
          style={{
            backgroundColor: "#24292e",
            minHeight: "calc(100vh - 56px)",
          }}
        >
          <ListGroup style={{ marginTop: "20px" }}>
            <ListGroup.Item>
              <strong>NoteBook 1</strong>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <ScrollSync>
          <React.Fragment>
            <Col xs={5} style={{ backgroundColor: "red", padding: "0" }}>
              <Form>
                <Form.Group
                  controlId="exampleForm.ControlTextarea1"
                  style={{ margin: "0" }}
                >
                  <ScrollSyncPane>
                    <Form.Control
                      as="textarea"
                      style={{
                        height: "calc(100vh - 56px)",
                        border: "none",
                        borderRadius: "0",
                        resize: "none",
                        overflow: "auto",
                      }}
                      onChange={(e) => setInput(e.target.value)}
                      value={input}
                    />
                  </ScrollSyncPane>
                </Form.Group>
              </Form>
            </Col>
            <ScrollSyncPane>
              <Col
                xs={5}
                style={{
                  backgroundColor: "white",
                  borderLeft: "1px solid rgb(206, 206, 206)",
                  maxHeight: "calc(100vh - 56px)",
                  overflow: "auto",
                }}
              >
                <ReactMarkdown source={input} />
              </Col>
            </ScrollSyncPane>
          </React.Fragment>
        </ScrollSync>
      </Row>
    </Container>
  );
};
export default App;
