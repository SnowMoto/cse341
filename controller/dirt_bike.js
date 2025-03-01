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
        const newBike = req.body;
        if (!newBike.bike_id || !newBike.bike_model) {
            return res.status(400).json({ message: "Bike ID and model are required." });
        }

        const result = await mongodb
            .getDb()
            .db()
            .collection('dirt_bikes')
            .updateOne(
                {},
                { $push: { dirtbikes: newBike } },
                { upsert: true }
            );

        res.status(201).json({ message: "Bike added successfully.", result });
    } catch (error) {
        console.error("Error adding bike:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update an existing bike
const updateBike = async (req, res) => {
    try {
        const { bike_id } = req.params;
        const updatedData = req.body;

        if (!bike_id) {
            return res.status(400).json({ message: "Bike ID is required." });
        }

        const result = await mongodb
            .getDb()
            .db()
            .collection('dirt_bikes')
            .updateOne(
                { "dirtbikes.bike_id": bike_id },
                { $set: { "dirtbikes.$": updatedData } }
            );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "No bike found with the given ID." });
        }

        res.status(200).json({ message: "Bike updated successfully.", result });
    } catch (error) {
        console.error("Error updating bike:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getAllBikes,
    getSingleBike,
    updateBike,
    addBike
};
