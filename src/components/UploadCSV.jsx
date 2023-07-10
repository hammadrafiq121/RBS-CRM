import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadCustomers } from "../services/customerApi";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUsers } from "../app/reducers/userSlice.js";
import Spinner from "./Spinner";

const UploadCSV = () => {
  const dispatch = useDispatch();

  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      if (isError) {
        console.log(message);
      }
      await dispatch(getUsers());
    };
    fetchUsers();
  }, [dispatch]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleChange = (event) => {
    setSelectedAgent(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      return alert("Please select a file");
    }
    if (!selectedAgent) {
      return alert("Please select a agent");
    }
    try {
      const formData = new FormData();
      formData.append("csvFile", selectedFile);
      formData.append("user", selectedAgent);
      await uploadCustomers(formData);
    } catch (error) {
      console.log("Error uploading customers from CSV:", error);
    }
  };

  const allUsers =
    users &&
    users.map((user) => (
      <option key={user._id} value={user._id}>
        {user.userName}
      </option>
    ));

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Col sm={12}>
                <Form.Label></Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
              <Col sm={6}>
                <Form.Select
                  value={selectedAgent}
                  name="agent"
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Agent
                  </option>
                  {allUsers}
                </Form.Select>
              </Col>
              <Col sm={6}>
                <Button className="mb-2 mr-2" variant="secondary" type="submit">
                  Upload
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadCSV;
