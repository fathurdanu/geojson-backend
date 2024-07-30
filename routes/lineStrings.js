const fs = require('fs');
const app = require("express").Router();

app.get("/line-strings", (req, res) => {
    try {
        fs.readFile('./data/lineStrings.json', 'utf8', function (err, data) {
            const result = JSON.parse(data)
            // const limit = Number(req?.query?.limit);
            // const skip = Number(req?.query?.skip) || 0;
            // const finalResult = result.slice(skip, limit ? skip + limit : result?.length)
            // const meta = {
            //     totalData: result?.length,
            //     data: finalResult
            // }
            const meta = {
                type: "FeatureCollection",
                features: result
            }
            res.status(200).json(meta);
        })
    } catch (e) {
        res.status(400).json(e)
    }
});

app.get("/line-strings/:id", (req, res) => {
    try {
        fs.readFile('./data/points.json', 'utf8', function (err, data) {
            let points = JSON.parse(data);
            const id = Number(req.params.id);
            const point = points.find(point => Number(point.id) === id);
            res.status(200).json(point);
        })
    } catch (e) {
        res.status(400).json(e)
    }
});

app.post("/line-strings", (req, res) => {
    try {
        fs.readFile('./data/points.json', 'utf8', function (err, data) {
            const points = JSON.parse(data)
            const lastPoint = points?.at(-1)
            let point = req?.body;
            const newId = Number(lastPoint?.id) + 1;
            point.id = newId
            points.push(point)
            let strJson = JSON.stringify(points);
            fs.writeFileSync('./data/points.json', strJson, 'utf8');
            res.status(201).json({
                id: newId
            });
        })
    } catch (e) {
        res.status(400).json(e)
    }
})

app.put("/line-strings/:id", (req, res) => {
    try {
        if (!req?.params?.id) throw 0;
        if (!req?.body) throw 0;
        fs.readFile('./data/points.json', 'utf8', function (err, data) {
            let points = JSON.parse(data);
            const id = Number(req.params.id);
            const pointIndex = points.findIndex(point => Number(point.id) === id);

            let newPoint = req?.body;
            newPoint.id = Number(id);

            points[pointIndex] = newPoint;
            let strJson = JSON.stringify(points);
            fs.writeFileSync('./data/points.json', strJson, 'utf8');
            res.status(201).send("success");
        })
    } catch (e) {
        res.status(400).json(e)
    }
})

app.delete("/line-strings/:id", (req, res) => {
    try {
        if (!req?.params?.id) throw 0;
        fs.readFile('./data/points.json', 'utf8', function (err, data) {
            let points = JSON.parse(data);
            const id = Number(req.params.id);
            points = points.filter(point => Number(point.id) !== id);
            let strJson = JSON.stringify(points);
            fs.writeFileSync('./data/points.json', strJson, 'utf8');
            res.status(201).send("success");
        })
    } catch (e) {
        res.status(400).json(e)
    }
})

module.exports = app;