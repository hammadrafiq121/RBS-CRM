import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerApi from "../../services/customerApi";

const initialState = {
  customers: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getCustomers = createAsyncThunk(
  "customers/getCustomers",
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      // console.log(token);
      const response = await customerApi.getCustomers();
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCustomer = createAsyncThunk(
  "customers/getCustomer",
  async (customerId, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      // console.log(token);
      const response = await customerApi.getCustomer(customerId);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addCustomer = createAsyncThunk(
  "customers/addCustomer",
  async (customer, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      // console.log(token);
      const response = await customerApi.addCustomer(customer);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async ({ id, customer }, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      // console.log(token);
      const response = await customerApi.updateCustomer(id, customer);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (customerId, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      // console.log(token);
      await customerApi.deleteCustomer(customerId);
      return customerId;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Customers fetched successfully.";
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getCustomer.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true; // Set the 'isSuccess' flag to indicate a successful request
        state.customers.push(action.payload);
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; // Set the 'isSuccess' flag to indicate a failed request
        state.message = action.payload;
      })
      .addCase(addCustomer.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Customer added successfully.";
        state.customers.push(action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Customer updated successfully.";
        const { id, updatedCustomer } = action.payload;
        const customerIndex = state.customers.findIndex(
          (customer) => customer._id === id
        );
        if (customerIndex !== -1) {
          state.customers[customerIndex] = updatedCustomer;
        } else {
          console.log(`Customer with ID ${id} not found.`);
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Customer deleted successfully.";
        const customerId = action.payload;
        state.customers = state.customers.filter(
          (customer) => customer._id !== customerId
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = customersSlice.actions;

export default customersSlice.reducer;

// export const clearCustomers = createAsyncThunk(
//   "customers/clearCustomers",
//   async () => {
//     return [];
//   }
// );

// .addCase(clearCustomers.pending, (state) => {
//   state.isLoading = true;
//   state.isError = false;
//   state.isSuccess = false;
//   state.message = "";
// })
// .addCase(clearCustomers.fulfilled, (state, action) => {
//   state.isLoading = false;
//   state.isError = false;
//   state.isSuccess = true;
//   state.message = "Customers cleared successfully.";
//   state.customers = action.payload;
// })
// .addCase(clearCustomers.rejected, (state) => {
//   state.isLoading = false;
//   state.isError = true;
//   state.isSuccess = false;
//   state.message = "Failed to clear customers.";
// });
