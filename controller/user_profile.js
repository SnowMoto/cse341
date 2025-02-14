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
    const parentDocument = await userCollection.findOne({});
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
    const response = await userCollection.updateOne(
      { _id: parentDocument._id },
      { $push: { users: user } }
    );
    if (response.acknowledged) {
      res.status(201).json({ message: "User created successfully", userId: user.user_id });
    } 
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;  
    const { username, email, password, state, dirtbike, riding_style, rider_level } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const db = mongodb.getDb().db();
    const userCollection = db.collection("user_profile");
    const response = await userCollection.updateOne(
      { "users.user_id": userId },  
      { $set: { 
          "users.$.username": username,
          "users.$.email": email,
          "users.$.password": password,
          "users.$.state": state,
          "users.$.dirtbike": dirtbike,
          "users.$.riding_style": riding_style,
          "users.$.rider_level": rider_level
        }
      }
    );

    if (response.modifiedCount === 0) {
      return res.status(404).json({ error: "User not found or no changes made." });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const db = mongodb.getDb().db();
    const userCollection = db.collection("user_profile");
    const response = await userCollection.updateOne(
      { "users.user_id": userId },  
      { $pull: { users: { user_id: userId } } } 
    );

    if (response.modifiedCount === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};
