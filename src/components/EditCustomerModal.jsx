import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import csc from "country-state-city";
import { MultiSelect } from "react-multi-select-component";
import { updateCustomer } from "../services/api";
import { updateCustomer as updateCustomerAction } from "../app/customersSlice";
import { useDispatch } from "react-redux";

const EditCustomerModal = ({ customer }) => {
  const dispatch = useDispatch();

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
  useEffect(() => {
    if (customer) {
      setFormData(customer);
    }
  }, [customer]);

  const productNames = [
    { label: "Hospital Stretchers", value: "hospital-stretchers" },
    { label: "Defibrillators", value: "defibrillators" },
    { label: "Anesthesia Machines", value: "anesthesia-machines" },
    { label: "Patient Monitors", value: "patient-monitors" },
  ];

  const handleUpdate = async (event) => {
    event.preventDefault();
    await updateCustomer(formData, customer._id);
    dispatch(
      updateCustomerAction({ id: customer._id, updatedCustomer: formData })
    );
    handleCloseModal();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Button
        variant="link"
        className="symbol-button"
        onClick={handleShowModal}
      >
        <PencilSquare />
      </Button>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="custom-modal-width"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Row>
              <Col md={8}>
                <Form.Group as={Row} controlId="companyName" className="mb-2">
                  <Form.Label column sm={3}>
                    Company Name
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
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
                      type="text"
                      placeholder=""
                      name="companyFax"
                      value={formData.companyFax}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  controlId="companyAddress"
                  className="mb-2"
                >
                  <Form.Label column sm={3}>
                    Address
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
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
                  <Button
                    className="mb-2 mr-2"
                    variant="secondary"
                    type="submit"
                  >
                    Update
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default EditCustomerModal;
