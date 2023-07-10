import User from "../model/userSchema.js";
import JWT from "jsonwebtoken";

const createToken = (_id) => {
  return JWT.sign({ _id: _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const loginUser = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    const userRole = user.userRole;
    response.status(200).json({ email, userRole, token });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

export const signupUser = async (request, response) => {
  const { fullName, userName, email, password, userRole } = request.body;
  try {
    const user = await User.signup(
      fullName,
      userName,
      email,
      password,
      userRole
    );

    const token = createToken(user._id);

    response.status(200).json({ email, token });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

export const getMe = async (request, response) => {
  try {
    // Assuming the authenticated user's information is available in the request.user object
    const user = request.user;
    // Respond with the user's information
    response.status(200).json(user);
  } catch (error) {
    response.status(500).json({ error: "Failed to retrieve user information" });
  }
};

export const getAllUsers = async (request, response) => {
  try {
    const users = await User.find().select("_id userName").sort({
      createdAt: -1,
    });

    return response.status(200).json(users);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
