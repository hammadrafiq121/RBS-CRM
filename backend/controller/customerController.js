import Customer from "../model/customerSchema.js";
import User from "../model/userSchema.js";
import Test from "../model/test.js";
import csv from "csv-parser";
import fs from "fs";

export const addCustomer = async (request, response) => {
  try {
    const newCustomer = await Customer.create({
      ...request.body,
      user: request.user._id,
    });
    await newCustomer.save();

    return response.status(200).json(newCustomer);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getAllCustomers = async (request, response) => {
  try {
    const customers = await Customer.find({ user: request.user._id }).sort({
      createdAt: -1,
    });

    return response.status(200).json(customers);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getSingleCustomer = async (request, response) => {
  try {
    const customerId = request.params.id;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return response.status(404).json({ error: "Customer not found" });
    }

    const user = await User.findById(request.user._id);

    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }

    const customerUserId = customer.user; // MongoDB ObjectID from customer document
    const loggedInUserId = user._id; // MongoDB ObjectID from user document

    // Make sure the logged-in user matches the customer user
    if (!customerUserId.equals(loggedInUserId)) {
      return response.status(401).json({ error: "User not authorized" });
    }

    return response.status(200).json(customer);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const updateCustomer = async (request, response) => {
  try {
    const customerId = request.params.id;
    const customer = await Customer.findById(request.params.id);

    const user = await User.findById(request.user._id);

    // Check for user
    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }

    const customerUserId = customer.user; // MongoDB ObjectID from customer document
    const loggedInUserId = user._id; // MongoDB ObjectID from user document

    // Make sure the logged in user matches the customer user
    if (!customerUserId.equals(loggedInUserId)) {
      return response.status(401).json({ error: "User not authorized" });
    }

    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: customerId },
      request.body,
      {
        new: true,
      }
    );
    if (updatedCustomer) {
      return response.status(200).json(updatedCustomer);
    } else {
      return response.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    return response.status(500).json({ error: "Failed to update customer" });
  }
};

export const deleteCustomer = async (request, response) => {
  try {
    const customerId = request.params.id;
    const customer = await Customer.findById(request.params.id);

    const user = await User.findById(request.user._id);

    // Check for user
    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }

    const customerUserId = customer.user; // MongoDB ObjectID from customer document
    const loggedInUserId = user._id; // MongoDB ObjectID from user document

    // Make sure the logged in user matches the customer user
    if (!customerUserId.equals(loggedInUserId)) {
      return response.status(401).json({ error: "User not authorized" });
    }

    const deletedCustomer = await Customer.findByIdAndDelete(customerId);
    return response.status(200).json(deletedCustomer);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const uploadCustomers = async (req, res) => {
  try {
    const filePath = req.file.path;
    const user = req.body.user;
    const results = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
          const productValues = data.products.split("|");
          const products = productValues.map((product) => {
            const trimmedProduct = product.trim();
            const lowercaseProduct = trimmedProduct.toLowerCase();
            const wordsInProduct = lowercaseProduct.split(" ");
            const capitalizedProduct = wordsInProduct
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
            return {
              label: capitalizedProduct,
              value: lowercaseProduct.replace(/\s+/g, "-"),
            };
          });

          // const products = productValues.map((product) => ({
          //   label: product,
          //   value: product,
          // }));

          // Create a new object with the modified products array
          const newData = { ...data, products, user };

          // Push the modified data to the results array
          results.push(newData);
        })
        .on("end", () => resolve());
    });

    const docs = await Customer.insertMany(results);

    await new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log("File deleted successfully");
          resolve();
        }
      });
    });

    // fs.unlink(filePath, (err) => {
    //   if (err) {
    //     console.error("Error deleting file:", err);
    //   } else {
    //     console.log("File deleted successfully");
    //   }
    // });

    res.status(200).json(docs);
  } catch (error) {
    console.error("Error uploading customers from CSV:", error);
    res
      .status(500)
      .json({ message: "An error occurred while uploading customers" });
  }
};

// export const toggleCurrentTodo = async (request, response) => {
//   try {
//     const currentTodo = await todo.findById(request.params.id);
//     const updateCurrentTodo = await todo.findOneAndUpdate(
//       { _id: request.params.id },
//       { done: !currentTodo.done }
//     );
//     await updateCurrentTodo.save();
//     return response.status(200).json(updateCurrentTodo);
//   } catch (error) {
//     return response.status(500).json(error.message);
//   }
// };

// export const addCustomersFromCSV = async (req, res) => {
//   try {
//     const results = [];

//     // Check if a file was uploaded
//     if (!req.files || !req.files.csvFile) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const file = req.files.csvFile;

//     // Process the CSV file
//     fs.createReadStream(file.tempFilePath)
//       .pipe(csv())
//       .on("data", async (data) => {
//         try {
//           // Create a new customer using the data from the CSV row
//           const newCustomer = await Customer.create(data);
//           await newCustomer.save();

//           results.push(newCustomer);
//         } catch (error) {
//           console.log("Error adding customer:", error);
//         }
//       })
//       .on("end", () => {
//         // Send the added customers as the response
//         return res.status(200).json(results);
//       });
//   } catch (error) {
//     console.log("Error adding customers from CSV:", error);
//     return res.status(500).json({
//       message: "Failed to add customers from CSV",
//       error: error.message,
//     });
//   }
// };
