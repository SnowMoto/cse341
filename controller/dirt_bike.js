const mongodb = require('../db/connect');
const { ObjectId } = require("mongodb");

// Get all bikes
const getAllBikes = async (req, res) => {
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('dirt_bikes')
            .aggregate([
                { $unwind: "$dirtbikes" },
                {
                    $project: {
                        _id: 0,
                        "bike_id": "$dirtbikes.bike_id",
                        "bike_model": "$dirtbikes.bike_model"
                    }
                }
            ])
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching bikes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a single bike by model
const getSingleBike = async (req, res) => {
    const { bike_model } = req.params;
    console.log("Received bike model:", bike_model);
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('dirt_bikes')
            .aggregate([
                { $unwind: "$dirtbikes" },
                { $match: { "dirtbikes.bike_model": bike_model } },
                {
                    $project: {
                        _id: 0,
                        "bike_id": "$dirtbikes.bike_id",
                        "bike_model": "$dirtbikes.bike_model",
                        "engine_type": "$dirtbikes.engine_type",
                        "trail_type": "$dirtbikes.trail_type",
                        "handling_type": "$dirtbikes.handling_type",
                        "racing_type": "$dirtbikes.racing_type",
                        "rider_level": "$dirtbikes.rider_level"
                    }
                }
            ])
            .toArray();
        if (result.length === 0) {
            return res.status(404).json({ message: "No bikes found with the given model." });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching bike:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Add a new bike
const addBike = async (req, res) => {
    try {
      // Extract bike data from the request body
      const newBike = {
        bike_id: req.body.bike_id, 
        bike_model: req.body.bike_model, 
        engine_type: req.body.engine_type, 
        trail_type: req.body.trail_type, 
        handling_type: req.body.handling_type, 
        racing_type: req.body.racing_type, 
        rider_level: req.body.rider_level,
      };
        const response = await mongodb
        .getDb()
        .db()
        .collection('dirt_bikes') 
        .insertOne({ dirtbikes: [newBike] }); 
  
      if (response.insertedCount > 0) {
        res.status(201).json({ message: "Bike added successfully", bike: newBike });
      } else {
        res.status(500).json({ error: "Failed to add the bike." });
      }
    } catch (error) {
      console.error("Error adding bike:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
module.exports = {
    getAllBikes,
    getSingleBike,
    addBike
};
