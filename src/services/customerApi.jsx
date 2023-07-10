import axios from "axios";
import store from "../app/store";
const backendUrl = "http://localhost:3000";

//converting above api call to async

export const getCustomers = async () => {
  try {
    const { token } = store.getState().auth.user;
    return await axios.get(`${backendUrl}/api/customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(`Error while calling get customer api ${error}`);
  }
};

export async function getCustomer(id) {
  try {
    const { token } = store.getState().auth.user;

    return await axios.get(`${backendUrl}/api/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(`Error while calling get customer api ${error}`);
  }
}

export const addCustomer = async (data) => {
  try {
    const { token } = store.getState().auth.user;

    return await axios.post(`${backendUrl}/api/customers`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(`Error while calling add user api ${error}`);
  }
};

export const updateCustomer = async (id, customer) => {
  try {
    const { token } = store.getState().auth.user;

    return await axios.put(`${backendUrl}/api/customers/${id}`, customer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(`Error while calling eidt customer api ${error}`);
  }
};

export async function deleteCustomer(id) {
  try {
    const { token } = store.getState().auth.user;

    return await axios.delete(`${backendUrl}/api/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(`Error while calling delete customer api ${error}`);
  }
}

export const uploadCustomers = async (formData) => {
  try {
    const { token } = store.getState().auth.user;
    return await axios.post(`${backendUrl}/api/customers/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log("Error upload customers from CSV:", error);
  }
};
// export const addCustomersFromCSV = async (file) => {
//   try {
//     const formData = new FormData();
//     formData.append("csvFile", file);

//     console.log(formData.get("csvFile"));

//     const response = await axios.post(
//       `${backendUrl}/api/customers/upload`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     // console.log(response);

//     if (response.status === 200) {
//       return response.data; // Assuming the API returns the data for the added customers
//     } else {
//       throw new Error("Failed to add customers from CSV");
//     }
//   } catch (error) {
//     console.log("Error adding customers from CSV:", error);
//     throw error; // Propagate the error to the caller
//   }
// };

const customerApi = {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomer,
  uploadCustomers,
};
export default customerApi;
