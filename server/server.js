const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/collegeDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
const app = express();
const collegeSchema = new mongoose.Schema({
  name: String,
  location: String,
  fees: Number,
  rating: Number,
  courses: [String],
  exams: [String],
  placements: {
    average: Number,
    highest: Number
  },
  roi: Number,
  cutoff: Object
});

const College = mongoose.model("College", collegeSchema);

app.use(cors());
app.use(express.json());
app.get("/colleges", async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/colleges/filter", async (req, res) => {
  try {
    const { location, course } = req.query;

    let query = {};

    if (location) query.location = location;
    if (course) query.courses = course;

    const colleges = await College.find(query);

    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/colleges", async (req, res) => {
  try {
    const newCollege = new College(req.body);
    await newCollege.save();
    res.json(newCollege);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});