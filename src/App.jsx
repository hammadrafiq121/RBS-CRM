import React from "react";
import EditCustomer from "./components/EditCustomer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./style.css";
import AddCustomer from "./components/AddCustomer";
import Customers from "./components/Customers";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import UploadCSV from "./components/UploadCSV";
import Test from "./components/Test";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/addCustomer" element={<AddCustomer />} />
          {user && (
            <Route
              path="/customers/upload"
              element={
                user.userRole === "admin" ? (
                  <UploadCSV />
                ) : (
                  <Navigate to="/test" />
                )
              }
            />
          )}

          <Route
            path="/customers/editCustomer/:id"
            element={<EditCustomer />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
