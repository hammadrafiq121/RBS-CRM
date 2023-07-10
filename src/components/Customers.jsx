import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Form, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ViewCustomerModal from "./ViewCustomerModal";
import DeleteCustomer from "./DeleteCustomer";
import { PencilSquare } from "react-bootstrap-icons";

// import { getCustomers } from "../services/customerApi";
import { getCustomers } from "../app/reducers/customersSlice";
import Spinner from "./Spinner";

import { toast } from "react-toastify";

const Customers = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { customers, isLoading, isError, message } = useSelector(
    (state) => state.customers
  );

  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (user) {
      dispatch(getCustomers());
    }
  }, [user, dispatch]);

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const filteredCustomers = customers.filter((customer) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      customer.companyName.toLowerCase().includes(keyword) ||
      customer.state.toLowerCase().includes(keyword) ||
      customer.city.toLowerCase().includes(keyword) ||
      customer.status.toLowerCase().includes(keyword)
    );
  });

  const allCustomers =
    filteredCustomers &&
    filteredCustomers.map((customer) => (
      <tr key={customer._id} className="atim">
        <td>{customer.companyName}</td>
        <td>{customer.state}</td>
        <td>{customer.city}</td>
        <td>{customer.status}</td>
        <td>
          <ViewCustomerModal customer={customer} />
          <Button
            variant="link"
            className="symbol-button"
            as={Link}
            to={{
              pathname: `/customers/editCustomer/${customer._id}`,
            }}
          >
            <PencilSquare />
          </Button>
          <DeleteCustomer customer={customer} />
        </td>
      </tr>
    ));

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <section className="tab">
        <Container className="tab_div1">
          <Form>
            <Row className="table_1">
              <Col lg={6}>
                <Form.Group controlId="companyName" className="mb-2">
                  <Form.Control
                    type="text"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                  />
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group className="mb-2">
                  <Link to="/customers/addCustomer">
                    <Button
                      className="mb-2 mr-2"
                      variant="secondary"
                      type="submit"
                    >
                      Create Customer
                    </Button>
                  </Link>
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group className="mb-2">
                  <Link to="/customers/upload">
                    <Button
                      className="mb-2 mr-2"
                      variant="secondary"
                      type="submit"
                    >
                      Upload
                    </Button>
                  </Link>
                </Form.Group>
              </Col>
            </Row>
          </Form>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Business Name</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="tbody">{allCustomers}</tbody>
            </Table>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Customers;
