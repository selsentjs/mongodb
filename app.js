require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoute");
const connectDB = require("./database/db");

const app = express();
app.use("/api/user", userRoutes);
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Home page");
});

const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL); //MONGO_URL = mongodb://localhost/company
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
