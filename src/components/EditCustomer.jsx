import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { MultiSelect } from "react-multi-select-component";
import { connect } from "react-redux";

//ther is no use of this line in the code below
import customerApi from "../services/customerApi";

import { useNavigate, useParams } from "react-router-dom";
import { updateCustomer, getCustomer } from "../app/reducers/customersSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const EditCustomer = () => {
  const stlye = {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
  };
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    companyName: "",
    companyPhone: "",
    companyFax: "",
    companyAddress: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    personName: "",
    personPhone: "",
    personEmail: "",
    comments: "",
    status: "",
    products: [],
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, isLoading, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetch = async () => {
      if (isError) {
        toast.error(message);
      }
      if (user) {
        const customer = await dispatch(getCustomer(id));
        setFormData(customer.payload);
      }
    };
    fetch();
  }, [user, dispatch, id]);

  const productNames = [
    { label: "Hospital Stretchers", value: "hospital-stretchers" },
    { label: "Defibrillators", value: "defibrillators" },
    { label: "Anesthesia Machines", value: "anesthesia-machines" },
    { label: "Patient Monitors", value: "patient-monitors" },
  ];

  const handleEdit = () => {
    setIsDisabled(!isDisabled);
  };
  const handleChange = (event) => {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };
  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleUpdate = async (event) => {
    event.preventDefault();
    await dispatch(updateCustomer({ id: formData._id, customer: formData }));
    navigate("/customers/");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="tab">
      <Container style={stlye}>
        <Form onSubmit={handleUpdate}>
          <Row>
            <Col md={8}>
              <Form.Group as={Row} controlId="companyName" className="mb-2">
                <Form.Label column sm={3}>
                  Company Name
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    disabled={isDisabled}
                    type="text"
                    placeholder=""
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="companyPhone" className="mb-2">
                <Form.Label column sm={3}>
                  Phone
                </Form.Label>
                <Col sm={9}>
                  <PhoneInput
                    disabled={isDisabled}
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={(value) =>
                      handleInputChange("companyPhone", value)
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="companyFax" className="mb-2">
                <Form.Label column sm={3}>
                  Fax
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    disabled={isDisabled}
                    type="text"
                    placeholder=""
                    name="companyFax"
                    value={formData.companyFax}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="companyAddress" className="mb-2">
                <Form.Label column sm={3}>
                  Address
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    disabled={isDisabled}
                    type="text"
                    placeholder=""
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="country" className="mb-2">
                <Form.Label column sm={3}>
                  Country
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    disabled
                    as="select"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    <option value={formData.country} key={formData.country}>
                      {formData.country}
                    </option>
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="SCZ" className="mb-2">
                <Form.Label column sm={3}></Form.Label>
                <Col sm={3}>
                  <Form.Group as={Col} controlId="state" className="mb-2">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      disabled
                      as="select"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    >
                      <option value={formData.state} key={formData.state}>
                        {formData.state}
                      </option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col sm={3}>
                  <Form.Group as={Col} controlId="city" className="mb-2">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      disabled
                      as="select"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    >
                      <option value={formData.city} key={formData.city}>
                        {formData.city}
                      </option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col sm={3}>
                  <Form.Group as={Col} controlId="zipCode" className="mb-2">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      disabled={isDisabled}
                      type="number"
                      style={{ backgroundColor: "#ced4da" }}
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Form.Group>

              <h5>Contact Person</h5>
              <Form.Group as={Row} controlId="personName" className="mb-2">
                <Form.Label column sm={3}>
                  Name
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    disabled={isDisabled}
                    type="text"
                    placeholder=""
                    name="personName"
                    value={formData.personName}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="personPhone" className="mb-2">
                <Form.Label column sm={3}>
                  Phone
                </Form.Label>
                <Col sm={9}>
                  <PhoneInput
                    disabled={isDisabled}
                    name="personPhone"
                    value={formData.personPhone}
                    onChange={(value) =>
                      handleInputChange("personPhone", value)
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="personEmail" className="mb-2">
                <Form.Label column sm={3}>
                  Email
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    disabled={isDisabled}
                    type="email"
                    placeholder=""
                    name="personEmail"
                    value={formData.personEmail}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="comments" className="mb-2">
                <Form.Label column sm={3}>
                  Comments
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    disabled={isDisabled}
                    as="textarea"
                    placeholder=""
                    rows={3}
                    value={formData.comments}
                    name="comments"
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col md={4}>
              <div className="drop-container">
                <Form.Group as={Row} className="mb-2">
                  <Col sm={12}>
                    <Form.Select
                      disabled={isDisabled}
                      value={formData.status}
                      name="status"
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      <option value="Interested">Interested</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                  <Col sm={12}>
                    <MultiSelect
                      disabled={isDisabled}
                      name="products"
                      options={productNames}
                      value={formData.products}
                      onChange={(selected) =>
                        handleInputChange("products", selected)
                      }
                      labelledBy="Select"
                    />
                  </Col>
                </Form.Group>
              </div>
              <Form.Group as={Row} className="mb-2">
                {isDisabled && (
                  <Button
                    className="mb-2 mr-2"
                    variant="secondary"
                    type="button"
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                )}
                <Button className="mb-2 mr-2" variant="secondary" type="submit">
                  Update
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </main>
  );
};

export default connect(null)(EditCustomer);
