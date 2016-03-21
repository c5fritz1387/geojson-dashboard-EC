var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');


//psql package import
var pg = require("pg");
var conString = "postgres://c5fritz1387@localhost:5432/BirchTest";

/* GET map page. */
router.get('/map', function (req, res) {
    var client = new pg.Client(conString);
    client.connect();
    var query = client.query("SELECT * FROM public.birchplot");
    query.on("row", function (row, result) {
        result.addRow(row);
    });

    query.on("end", function (result) {
        res.render('map', {
            "layers": (result.rows),
            lat: 40.7795213,
            lng: -73.9641241
        });
    });
});

/* GET pg json data. */
router.get('/layers', function (req, res) {
    var client = new pg.Client(conString);
    client.connect();
    var query = client.query("SELECT * FROM public.birchplot");
    query.on("row", function (row, result) {
        result.addRow(row);
    });
 
    query.on("end", function (result) {
        res.send(result.rows);
        res.end();
    });
});

/* GET pg json data. */
router.get('/pg/plots', function (req, res) {
        var client = new pg.Client(conString);
        client.connect();         

        var query = client.query("SELECT row_to_json(fc) " 
            + "FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features "
            + "FROM (SELECT 'Feature' As type "
                + ", ST_AsGeoJSON(lg.wkb_geometry)::json As geometry "
                + ", row_to_json(lp) As properties "
                + "FROM public.birchplot As lg "
                    + "INNER JOIN (SELECT * FROM public.birchplot) As lp "
                    + "ON lg.ogc_fid = lp.ogc_fid  ) As f )  As fc"); 
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            res.send(result.rows[0].row_to_json);
            res.end();
        });
});

/* Post tree data to db */
router.get('/addTrees', function (req, res) {

      res.render('form', {title: 'Add New Data'})
      res.end();
});

router.post('/api/v1/todos', function (req, res) {

    var results = [];

    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
            res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        });
    });

    res.render
});

router.get('/api/v1/todos', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

router.post('/dataAdded', function (req,res){

    var fields = [];
    var form = new formidable.IncomingForm();
    form.on('field',function (field, value){
        console.log(field);
        console.log(value);
        fields[field] = value;
    });
    form.on('end', function () {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields
        }));
    });
    form.parse(req);
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
