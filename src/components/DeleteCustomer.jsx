import React from "react";
import { Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import { deleteCustomer } from "../app/reducers/customersSlice";
import { useDispatch } from "react-redux";

const DeleteCustomer = ({ customer }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(deleteCustomer(customer._id));
  };

  return (
    <Button variant="link" className="symbol-button" onClick={handleDelete}>
      <Trash />
    </Button>
  );
};

export default DeleteCustomer;
