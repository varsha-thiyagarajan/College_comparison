const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Dummy Data
const colleges = [
{
  id: 1,
  name: "Delhi Technological University",
  location: "Delhi",
  fees: 120000,
  rating: 4.5,
  courses: ["B.Tech", "M.Tech"],
  exams: ["JEE Main"],
  cutoff: { jee: 10000 },
  feesBreakdown: { tuition: 90000, hostel: 20000, other: 10000 },
  placements: { average: 1000000, highest: 3000000, median: 900000 },
  infrastructure: "Urban campus with excellent connectivity",
  facultyQuality: "Highly reputed faculty",
  accreditation: ["NAAC A+"]
},

{
  id: 2,
  name: "Jadavpur University",
  location: "Kolkata",
  fees: 20000,
  rating: 4.6,
  courses: ["B.E", "M.E"],
  exams: ["WBJEE"],
  cutoff: { wbjee: 500 },
  feesBreakdown: { tuition: 10000, hostel: 5000, other: 5000 },
  placements: { average: 800000, highest: 2000000, median: 700000 },
  infrastructure: "Strong academic environment, research focus",
  facultyQuality: "Highly research-oriented faculty",
  accreditation: ["NAAC A"]
},

{
  id: 3,
  name: "Manipal Institute of Technology",
  location: "Manipal",
  fees: 300000,
  rating: 4.4,
  courses: ["B.Tech", "M.Tech"],
  exams: ["MET"],
  cutoff: { met: 7000 },
  feesBreakdown: { tuition: 250000, hostel: 30000, other: 20000 },
  placements: { average: 900000, highest: 2500000, median: 800000 },
  infrastructure: "World-class campus and labs",
  facultyQuality: "Industry-experienced faculty",
  accreditation: ["NAAC A+"]
},

{
  id: 4,
  name: "Thapar Institute of Engineering",
  location: "Patiala",
  fees: 320000,
  rating: 4.3,
  courses: ["B.Tech", "M.Tech"],
  exams: ["JEE Main"],
  cutoff: { jee: 20000 },
  feesBreakdown: { tuition: 270000, hostel: 30000, other: 20000 },
  placements: { average: 1100000, highest: 2800000, median: 950000 },
  infrastructure: "Modern campus with research labs",
  facultyQuality: "Strong academic faculty",
  accreditation: ["NAAC A+"]
},

{
  id: 5,
  name: "IIT Madras",
  location: "Chennai",
  fees: 200000,
  rating: 4.8,
  courses: ["B.Tech", "M.Tech"],
  exams: ["JEE Advanced"],
  cutoff: { jee: 1000 },
  feesBreakdown: { tuition: 150000, hostel: 30000, other: 20000 },
  placements: { average: 1800000, highest: 4000000, median: 1500000 },
  infrastructure: "Top-tier labs, research centers, hostels",
  facultyQuality: "Highly experienced professors",
  accreditation: ["NAAC A++"]
},

{
  id: 6,
  name: "NIT Trichy",
  location: "Trichy",
  fees: 150000,
  rating: 4.6,
  courses: ["B.Tech", "M.Tech"],
  exams: ["JEE Main"],
  cutoff: { jee: 8000 },
  feesBreakdown: { tuition: 110000, hostel: 25000, other: 15000 },
  placements: { average: 1200000, highest: 3000000, median: 1000000 },
  infrastructure: "Advanced labs, central library",
  facultyQuality: "Highly experienced faculty",
  accreditation: ["NAAC A+"]
},

{
  id: 7,
  name: "VIT Vellore",
  location: "Vellore",
  fees: 180000,
  rating: 4.5,
  courses: ["B.Tech", "M.Tech"],
  exams: ["VITEEE"],
  cutoff: { viteee: 5000 },
  feesBreakdown: { tuition: 140000, hostel: 25000, other: 15000 },
  placements: { average: 800000, highest: 2500000, median: 700000 },
  infrastructure: "Smart classrooms, large campus",
  facultyQuality: "Good mix of experienced faculty",
  accreditation: ["NAAC A++"]
}
];

// API
app.get("/colleges", (req, res) => {
  res.json(colleges);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});