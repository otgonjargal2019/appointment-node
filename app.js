const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const authRoutes = require("./routes/auth");
const organizationRoutes = require("./routes/organization");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my Node.js app!");
});

app.use("/auth", authRoutes);
app.use("/organization", organizationRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
