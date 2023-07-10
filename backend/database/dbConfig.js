import mongoose from "mongoose";

const Connection = async (user, pass) => {
  try {
    const URL = `mongodb+srv://${user}:${pass}@rbs-crm.pnopmr2.mongodb.net/`;
    // const URL = "mongodb://127.0.0.1:27017/";
    await mongoose.connect(URL, { useNewUrlParser: true });

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with the database:", error.message);
  }

  mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected");
  });
};

export default Connection;
