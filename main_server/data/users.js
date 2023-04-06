const mongoCollections = require("./../config/mongoCollections");
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");

/*
  Schema for users:
  {
    _id: ObjectId,
    company: String,
    email: String,
    firstName: String,
    lastName: String,
    projects: [ObjectId],
    type: String
  }
*/

const createUser = async (company, email, firstName, lastName, type) => {
  let errors = [];
  if (!email || typeof email !== "string") {
    errors.push("Email must be a string");
  }
  if (!firstName || typeof firstName !== "string") {
    errors.push("First name must be a string");
  }
  if (!lastName || typeof lastName !== "string") {
    errors.push("Last name must be a string");
  }
  if (!type || typeof type !== "string") {
    errors.push("Type must be a string");
  }

  if (errors.length > 0) {
    return { error: errors };
  }
  const userCollection = await users();
  const newUser = {
    company: "",
    email: email,
    firstName: firstName,
    lastName: lastName,
    projects: [],
    type: type,
  };

  const newInsertInformation = await userCollection.insertOne(newUser);
  if (newInsertInformation.insertedCount === 0) {
    return { error: "Could not add user" };
  }
  const newId = newInsertInformation.insertedId;
  const user = await getUserById(newId.toString());
  return user;
};

const getUserByEmail = async (email) => {
  if (!email) {
    return { error: "You must provide an email to search for" };
  }
  if (typeof email !== "string") {
    return { error: "Email must be a string" };
  }
  email = email.toLowerCase();
  email = email.trim();

  const userCollection = await users();
  const user = await userCollection.findOne({ email: email });
  if (!user) {
    return { error: "No user found with that email" };
  }

  user._id = user._id.toString();
  return user;
};

const getUserById = async (id) => {
  if (!id) {
    return { error: "You must provide an id to search for" };
  }
  if (typeof id !== "string") {
    return { error: "Id must be a string" };
  }
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    return { error: "Id is not valid" };
  }
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: ObjectId(id) });
  if (!user) {
    return { error: "No user found with that id" };
  }

  user._id = user._id.toString();
  return user;
};

const getAllUsers = async () => {
  const userCollection = await users();
  const userList = await userCollection.find({}).toArray();
  if (!userList) {
    return [{ error: "No users found" }];
  }
  for (let i = 0; i < userList.length; i++) {
    userList[i]._id = userList[i]._id.toString();
  }
  return userList;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  getUserByEmail,
};
