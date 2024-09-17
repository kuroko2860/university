const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Import routes
const userRoutes = require("./routes/user");
const universitySearchRoutes = require("./routes/university_search");
const majorSearchRoutes = require("./routes/major_search");
const favoriteListRoutes = require("./routes/favorite_list");
const administrativeBoardRoutes = require("./routes/administrative_board");
const majorRoutes = require("./routes/major");
const majorGroupRoutes = require("./routes/major_group");
const campusRoutes = require("./routes/campus");
const universityRoutes = require("./routes/university");
const statisticRoutes = require("./routes/statistic");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Use routes
app.use("/api", userRoutes);
app.use("/api/university_search", universitySearchRoutes);
app.use("/api/major_search", majorSearchRoutes);
app.use("/api/favorite_list", favoriteListRoutes);
app.use("/api/administrative_board", administrativeBoardRoutes);
app.use("/api/major_group", majorGroupRoutes);
app.use("/api/major", majorRoutes);
app.use("/api/campus", campusRoutes);
app.use("/api/university", universityRoutes);
app.use("/api/statistic", statisticRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
