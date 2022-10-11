//next type use moduler approach
const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes/subs");
const authRoutes = require("./routes/auth");

const app = express();

// middlewares
app.use(express.json({ limit: "5mb" }));
app.use(cors());

// db
mongoose
  .connect("mongodb+srv://nikhilkhedekar:Abcd%401234@stripe-mern.mfjb7d8.mongodb.net/stripe-mern?retryWrites=true&w=majority")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error ", err));

// autoload routes
app.use("/auth", authRoutes);
app.use("/api", routes);

// listen
const port = 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app