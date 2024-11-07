const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const port = 3000;
const path = require("path");
app.use(cors());
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

// Serve static files from the frontend directory
router.use(express.static(path.join(__dirname, "../frontend")));

router.get("/data", (req, res) => {
  const query = "SELECT * FROM country_and_capitals";

  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.json(result.rows);
    }
  });
});
app.use("/", router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
