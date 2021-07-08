import React from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';

const ModalComponent = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Find a ReadMe from GitHub</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Username or Organization</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Repository</Form.Label>
                <Form.Control type="text" placeholder="Repository" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Branch (default main)</Form.Label>
                <Form.Control type="text" placeholder="Branch" />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
          }}
          onClick={handleClose}
        >
          Find
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
