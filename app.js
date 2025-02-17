const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const authRoutes = require("./routes/auth");
const businessRoutes = require("./routes/business");
const bannerRoutes = require("./routes/banner");
const serviceRoutes = require("./routes/service");

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/business", businessRoutes);
app.use("/banner", bannerRoutes);
app.use("/service", serviceRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
