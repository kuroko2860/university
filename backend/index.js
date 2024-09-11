const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Import routes
const userRoutes = require("./routes/user");
const searchRoutes = require("./routes/search");
const favoriteListRoutes = require("./routes/favorite_list");
const administrativeBoardRoutes = require("./routes/administrative_board");
const majorRoutes = require("./routes/major");
const campusRoutes = require("./routes/campus");
const universityRoutes = require("./routes/university");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/favorite_list", favoriteListRoutes);
app.use("/api/administrative_board", administrativeBoardRoutes);
app.use("/api/major", majorRoutes);
app.use("/api/campus", campusRoutes);
app.use("/api/university", universityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
