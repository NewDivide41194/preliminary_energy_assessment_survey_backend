const express = require("express");
const appRouter=require("./routes")
const app = express();
// app.get("/", (req, res) => res.send("Hello"));
const port = 3001;
app.use("/api/v1",appRouter)

app.listen(port, () => console.log(`app is running on ${port}`));
