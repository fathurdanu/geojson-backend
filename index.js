const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()
const cors = require('cors')
const pointsRoutes = require("./routes/points");
const lineStringsRoutes = require("./routes/lineStrings");
// const polygonsRoutes = require("./routes/polygonRoutes");


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(pointsRoutes);
app.use(lineStringsRoutes);
// app.use(polygonsRoutes);

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})