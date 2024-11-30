const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const authRoutes = require("./routes/auth");
const organizationRoutes = require("./routes/organization");
const bannerRoutes = require("./routes/banner");

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/organization", organizationRoutes);
app.use("/banner", bannerRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
