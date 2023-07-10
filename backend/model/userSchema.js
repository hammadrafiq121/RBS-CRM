import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      required: true,
      enum: ["admin", "manager", "agent"],
    },
  },
  { timestamps: true }
);

//own static methods in mongoDB like if we create user by own function e.g User.signup() insteqad of User.create()
userSchema.statics.signup = async function (
  fullName,
  userName,
  email,
  password,
  userRole
) {
  //validations
  if (!fullName || !userName || !email || !password || !userRole) {
    throw Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("enter a valid email address");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("use a strong password");
  }

  //check if email alreadt in db
  const exists =
    (await this.findOne({ email })) || (await this.findOne({ userName }));
  if (exists) {
    throw Error("email or userName already exists");
  }

  //by using bcrypt generating salt
  const salt = await bcrypt.genSalt(10);
  //hashing the password before saving into database
  const hash = await bcrypt.hash(password, salt);
  //create user
  const user = await this.create({
    fullName,
    userName,
    email,
    password: hash,
    userRole,
  });
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("wrong email address");
    // throw Error("Invalid Credentials");
  }

  //campare password comes in parameter with the pass exists in database by bcrypt
  const match = await bcrypt.compare(password, user.password); //userExists.password is hashed password which exits in db
  if (!match) {
    throw Error("wrong password");
    // throw Error("Invalid Credentials");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
