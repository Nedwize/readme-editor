import React from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
const ModalComponent = ({ show, handleClose, onFormSubmit }) => {
  const [values, handleChange] = useForm({
    username: '',
    repository: '',
    branch: '',
  });

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Find a ReadMe from GitHub</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Username or Organization</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              name="username"
              value={values.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Repository</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Repository"
                  name="repository"
                  value={values.repository}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Branch (default master)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Branch"
                  name="branch"
                  value={values.branch}
                  onChange={handleChange}
                />
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
          onClick={() => {
            handleClose();
            return onFormSubmit(values);
          }}
        >
          Find
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
