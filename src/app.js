const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const schoolRoutes = require("./routes/schoolRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/", schoolRoutes);

app.get("/", (req, res) => {
  res.send("🚀 School API is running!");
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

module.exports = app;
