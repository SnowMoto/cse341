const mongodb = require('../db/connect');
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('user_profile').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSingle = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    console.log("Searching for user with user_id:", userId);

    const userProfile = await mongodb.getDb().db().collection('user_profile').findOne({
      "users.user_id": userId
    });

    if (!userProfile) {
      console.log("No user found for user_id:", userId);
      return res.status(404).json({ error: "User not found." });
    }

    const user = userProfile.users.find(u => u.user_id === userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Remove password before sending the response
    const { password, ...userWithoutPassword } = user;

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password, state, dirtbike, riding_style, rider_level } = req.body;
    const db = mongodb.getDb().db();
    const userCollection = db.collection("user_profile");
    //Check if user exsists 
    const existingUser = await userCollection.findOne({
      "users.user_id": username
    });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists." });
    }
    const user = {
      user_id: username, 
      username,
      email,
      password,
      state,
      dirtbike,
      riding_style,
      rider_level
    };
    const response = await userCollection.insertOne(user);
    if (response.acknowledged) {
      res.status(201).json({ message: "User created successfully", userId: user.user_id });
    } 
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const updateUser = async (req, res) => {

};

const deleteUser = async (req, res) => {

};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};
