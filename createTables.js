const db = require("./models");

const createTables = async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log("User table created successfully!");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    await db.sequelize.close();
  }
};

createTables();
