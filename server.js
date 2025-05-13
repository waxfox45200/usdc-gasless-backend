require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/save-charge", (req, res) => {
  const data = req.body;
  const charges = JSON.parse(fs.readFileSync("charges.json", "utf-8") || "[]");

  charges.push(data);
  fs.writeFileSync("charges.json", JSON.stringify(charges, null, 2));

  res.send({ status: "saved" });
});

app.listen(3001, () => {
  console.log("Backend running at http://localhost:3001");
});
