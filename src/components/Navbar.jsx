import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { reset, logout } from "../app/reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Person, BoxArrowInRight, BoxArrowInLeft } from "react-bootstrap-icons";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <>
      <Container className="header" fluid>
        <Row>
          <Col>
            <img src={logo} />
          </Col>
          <Col>
            {user ? (
              <>
                <button className="btn" onClick={handleLogout}>
                  <BoxArrowInLeft className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <BoxArrowInRight className="mr-2" /> Login
                </Link>
                <Link to="/signup">
                  <Person className="mr-2" /> Register
                </Link>
              </>
            )}
          </Col>
          <Col>
            <div className="p_image"></div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Navbar;
