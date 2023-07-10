import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../app/reducers/authSlice";
import Spinner from "./Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="tab">
      <Container className="tab_div1">
        <Form onSubmit={handleSubmit}>
          {/* <Form.Group controlId="userName">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
      </Form.Group> */}

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button className="mb-2 ml-2 mt-2" variant="secondary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </section>
  );
};

export default Login;
