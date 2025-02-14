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
    const userProfile = await mongodb.getDb().db().collection('user_profile').findOne({
      "users.user_id": userId
    });
    const user = userProfile.users.find(u => u.user_id === userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    // Remove password before sending the response
    const { password, ...userWithoutPassword } = user;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password, state, dirtbike, riding_style, rider_level } = req.body;
    const db = mongodb.getDb().db();
    const userCollection = db.collection("user_profile");
    const existingUser = await userCollection.findOne({"users.username": username});
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists." });
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
    const response = await userCollection.updateOne({},{ $push: { users: user } });
    if (response.acknowledged) {
      res.status(201).json({ message: "User created successfully", userId: user.user_id });
    } else {
      res.status(400).json({ error: "Failed to create user." });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id; 
    const userUpdate = {
      user_id: userId,  
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      state: req.body.state,
      dirtbike: req.body.dirtbike,
      riding_style: req.body.riding_style,
      rider_level: req.body.rider_level
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('user_profile')
      .updateOne({ "users.user_id": userId }, { $set: {"users.$": userUpdate }}
      );
    if (response.modifiedCount > 0) {
      res.status(204).send(); 
    } else {
      res.status(404).json({ error: "User not found or no changes made." });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await mongodb.getDb().db().collection('user_profile').updateOne(
      { "users.user_id": userId },  
      { $pull: { users: { user_id: userId } } }
    );
    if (result.modifiedCount > 0) {
      return res.status(200).send({ message: "User deleted successfully." });
    } else {
      return res.status(400).json({ error: "User could not be deleted." });
    }
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
