import app from "./app.js";
import dotenv from "dotenv";
import connectMongoDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectMongoDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port :${process.env.PORT}`);
    });
    app.on("Error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
  })
  .catch((error) => {
    console.log("MongoDB coneection Failed", error);
  });
