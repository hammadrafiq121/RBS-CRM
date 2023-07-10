import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import csc from "country-state-city";
import { MultiSelect } from "react-multi-select-component";
import { connect } from "react-redux";
import { addCustomer } from "../app/reducers/customersSlice";
import { useDispatch } from "react-redux";

const AddCustomer = () => {
  const stlye = {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
  };

  const dispatch = useDispatch();

  const blankForm = {
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
  };
  const [formData, setFormData] = useState(blankForm);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const productNames = [
    { label: "Hospital Stretchers", value: "hospital-stretchers" },
    { label: "Defibrillators", value: "defibrillators" },
    { label: "Anesthesia Machines", value: "anesthesia-machines" },
    { label: "Patient Monitors", value: "patient-monitors" },
  ];

  // const productNames = [
  //   "Hospital Stretchers",
  //   "Defibrillators",
  //   "Anesthesia Machines",
  //   "Patient Monitors",
  // ];

  useEffect(() => {
    const getCountries = async () => {
      try {
        setIsLoading(true);
        const result = await csc.getAllCountries();
        let allCountries = [];
        allCountries = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));

        const [{ isoCode: firstCountry } = {}] = allCountries;
        setCountries(allCountries);
        setFormData((prev) => ({
          ...prev,
          country: firstCountry,
        }));
        setIsLoading(false);
      } catch (error) {
        setCountries([]);
        setIsLoading(false);
      }
    };
    getCountries();
  }, []);

  useEffect(() => {
    const getStates = async () => {
      try {
        const result = await csc.getStatesOfCountry(formData.country);
        let allStates = [];
        allStates = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        const [{ isoCode: firstState = "" } = {}] = allStates;
        setCities([]);
        setFormData((prev) => ({
          ...prev,
          city: "",
        }));
        setStates(allStates);
        setFormData((prev) => ({
          ...prev,
          state: firstState,
        }));
      } catch (error) {
        setStates([]);
        setCities([]);
        setFormData((prev) => ({
          ...prev,
          city: "",
        }));
      }
    };

    getStates();
  }, [formData.country]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const result = await csc.getCitiesOfState(
          formData.country,
          formData.state
        );
        let allCities = [];
        allCities = result?.map(({ name }) => ({
          name,
        }));
        const [{ name: firstCity = "" } = {}] = allCities;
        setCities(allCities);
        setFormData((prev) => ({
          ...prev,
          city: firstCity,
        }));
      } catch (error) {
        setCities([]);
      }
    };
    getCities();
  }, [formData.state]);

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

  // const updatedData = async () => {
  //   await setFormData((prev) => ({
  //     ...prev,
  //     country: countries.find((country) => country.isoCode === formData.country)
  //       ?.name,
  //     state:
  //       states.find((state) => state.isoCode === formData.state)?.name || "",
  //   }));
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // await updatedData();

      await dispatch(addCustomer(formData)); // Dispatch the addCustomer action
      setFormData(blankForm);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <main className="tab">
      <Container style={stlye}>
        <Form onSubmit={handleSubmit}>
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
              <Form.Group as={Row} controlId="companyAddress" className="mb-2">
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
                {isLoading && (
                  <p className="loading">Loading countries. Please wait...</p>
                )}
                <Form.Label column sm={3}>
                  Country
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    as="select"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    {countries.map(({ isoCode, name }) => (
                      <option value={isoCode} key={isoCode}>
                        {name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="SCZ" className="mb-2">
                <Form.Label column sm={3}></Form.Label>
                <Col sm={3}>
                  <Form.Group as={Col} controlId="state" className="mb-2">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      as="select"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    >
                      {states.length > 0 ? (
                        states.map(({ isoCode, name }) => (
                          <option value={isoCode} key={isoCode}>
                            {name}
                          </option>
                        ))
                      ) : (
                        <option value="" key="">
                          No state found
                        </option>
                      )}
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col sm={3}>
                  <Form.Group as={Col} controlId="city" className="mb-2">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      as="select"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    >
                      {cities.length > 0 ? (
                        cities.map(({ name }) => (
                          <option value={name} key={name}>
                            {name}
                          </option>
                        ))
                      ) : (
                        <option value="">No cities found</option>
                      )}
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
                    {/* <MultiSelect
                      name="products"
                      options={productNames.map((name) => ({
                        label: name,
                        value: name,
                      }))}
                      value={formData.products}
                      onChange={(selected) =>
                        handleProductChange("products", selected)
                      }
                      labelledBy="Select"
                    /> */}
                  </Col>
                </Form.Group>
              </div>
              <Form.Group as={Row} className="mb-2">
                <Button className="mb-2 mr-2" variant="secondary" type="submit">
                  Submit
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </main>
  );
};

export default connect(null)(AddCustomer);
