const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const syllabusRoutes = require("./routes/syllabusRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const parentRoutes = require('./routes/parentRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/syllabus", syllabusRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/parents', parentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
