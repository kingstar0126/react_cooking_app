const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const colors = require("colors");
const multer = require("multer");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 8000;

// Connect to Database
connectDB();

const app = express();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cd(null, "images");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/recipeRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
