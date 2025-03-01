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
    const { bike_model } = req.params;
    const newBike = req.body; // Assuming the new bike data is coming in the body of the request.

    try {
        // Find the bike collection where you want to add the new bike
        const result = await mongodb
            .getDb()
            .db()
            .collection('dirt_bikes')
            .updateOne(
                { "dirtbikes.bike_model": bike_model }, // Match the bike model
                {
                    $push: { 
                        dirtbikes: newBike // Push the new bike object into the dirtbikes array
                    }
                }
            );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Bike model not found." });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: "New bike added successfully." });
    } catch (error) {
        console.error("Error adding new bike:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    getAllBikes,
    getSingleBike,
    addBike
};
