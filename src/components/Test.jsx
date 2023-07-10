// import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";
// import "react-phone-input-2/lib/style.css";
// import { connect } from "react-redux";
// import { Country, State, City } from "country-state-city";

// const Test = () => {
//   const style = {
//     padding: "20px",
//     backgroundColor: "white",
//     borderRadius: "10px",
//     boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
//   };

//   const blankForm = {
//     country: "",
//     state: "",
//     city: "",
//   };
//   const [formData, setFormData] = useState(blankForm);

//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const getCountries = async () => {
//       try {
//         setIsLoading(true);
//         const allCountries = await Country.getAllCountries().map(
//           ({ isoCode, name }) => ({
//             isoCode,
//             name,
//           })
//         );
//         const firstCountry = await allCountries[0].isoCode;
//         setCountries(allCountries);
//         setFormData((prev) => ({
//           ...prev,
//           country: firstCountry,
//         }));
//         setIsLoading(false);
//       } catch (error) {
//         setCountries([]);
//         setIsLoading(false);
//       }
//     };
//     getCountries();
//   }, []);

//   useEffect(() => {
//     const getStates = async () => {
//       try {
//         const allStates = await State.getStatesOfCountry(formData.country).map(
//           ({ isoCode, name }) => ({
//             isoCode,
//             name,
//           })
//         );
//         const firstState = await allStates[0].isoCode;
//         setCities([]);
//         setFormData((prev) => ({
//           ...prev,
//           city: "",
//         }));
//         setStates(allStates);
//         setFormData((prev) => ({
//           ...prev,
//           state: firstState,
//         }));
//       } catch (error) {
//         setStates([]);
//         setCities([]);
//         setFormData((prev) => ({
//           ...prev,
//           city: "",
//         }));
//       }
//     };
//     getStates();
//   }, [formData.country]);

//   useEffect(() => {
//     const getCities = async () => {
//       try {
//         const allCities = await City.getCitiesOfState(
//           formData.country,
//           formData.state
//         ).map(({ name }) => ({
//           name,
//         }));
//         const firstCity = await allCities[0].name;
//         setCities(allCities);
//         setFormData((prev) => ({
//           ...prev,
//           city: firstCity,
//         }));
//       } catch (error) {
//         setCities([]);
//       }
//     };
//     getCities();
//   }, [formData.state]);

//   const handleChange = (event) => {
//     setFormData((formData) => ({
//       ...formData,
//       [event.target.name]: event.target.value,
//     }));
//   };

//   useEffect(() => {
//     console.log(formData);
//   }, [formData]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       await setFormData((prev) => ({
//         ...prev,
//         country: countries.find(
//           (country) => country.isoCode === formData.country
//         )?.name,
//         state: states.find((state) => state.isoCode === formData.state)?.name,
//       }));

//       setFormData(blankForm);
//     } catch (error) {
//       console.log("error", error.message);
//     }
//   };

//   return (
//     <main className="tab">
//       <Container style={style}>
//         <Form onSubmit={handleSubmit}>
//           <Row>
//             <Col md={8}>
//               <Form.Group as={Row} controlId="country" className="mb-2">
//                 <Form.Label column sm={3}>
//                   Country
//                 </Form.Label>
//                 <Col sm={9}>
//                   <Form.Control
//                     as="select"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     required
//                   >
//                     {countries.map((country) => (
//                       <option key={country.isoCode} value={country.isoCode}>
//                         {country.name} - {country.isoCode}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </Col>
//               </Form.Group>

//               <Form.Group as={Row} controlId="SCZ" className="mb-2">
//                 <Form.Label column sm={3}></Form.Label>
//                 <Col sm={3}>
//                   <Form.Group as={Col} controlId="state" className="mb-2">
//                     <Form.Label>State</Form.Label>
//                     <Form.Control
//                       as="select"
//                       name="state"
//                       value={formData.state}
//                       onChange={handleChange}
//                     >
//                       {states.length > 0 ? (
//                         states.map((state) => (
//                           <option key={state.isoCode} value={state.isoCode}>
//                             {state.name} - {state.isoCode}
//                           </option>
//                         ))
//                       ) : (
//                         <option value="" key="">
//                           No state found
//                         </option>
//                       )}
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>

//                 <Col sm={3}>
//                   <Form.Group as={Col} controlId="city" className="mb-2">
//                     <Form.Label>City</Form.Label>
//                     <Form.Control
//                       as="select"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleChange}
//                     >
//                       {cities.length > 0 ? (
//                         cities.map((city) => (
//                           <option key={city.name} value={city.name}>
//                             {city.name}
//                           </option>
//                         ))
//                       ) : (
//                         <option key="" value="">
//                           No City found
//                         </option>
//                       )}
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col sm={3}>
//                   <Form.Group as={Row} className="mb-2">
//                     <Button
//                       className="mb-2 mr-2"
//                       variant="secondary"
//                       type="submit"
//                     >
//                       Submit
//                     </Button>
//                   </Form.Group>
//                 </Col>
//               </Form.Group>
//             </Col>
//           </Row>
//         </Form>
//       </Container>
//     </main>
//   );
// };

// export default connect(null)(Test);

import React from "react";

const Test = () => {
  return <div>Test</div>;
};

export default Test;
