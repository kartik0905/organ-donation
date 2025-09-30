require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("ODMS API is running..."));

app.use("/api/auth", require("./routes/auth.routes.js"));
app.use("/api/donors", require("./routes/donors.routes.js"));
app.use("/api/recipients", require("./routes/recipient.routes.js"));
app.use("/api/matching", require("./routes/matching.routes.js"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
