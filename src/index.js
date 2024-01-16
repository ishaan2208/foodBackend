import app from "./app.js";
import dotenv from "dotenv";
import { connectToDatabase } from "./database/index.js";

dotenv.config({
  path: "./.env",
});

// server

const PORT = process.env.PORT || 5010;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
