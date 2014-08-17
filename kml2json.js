#!/usr/bin/env node

var fs = require('fs'),
    xml2js = require('xml2js'),
    kml2json = require('commander');

// declare cli interface
kml2json
    .version('0.0.1')
    .option('-i, --input [file]', 'input kml file')
    .option('-o, --output [file]', 'output json file')
    .parse(process.argv);

if (!kml2json.input || !kml2json.output) {
    // show hints
    kml2json.help();
} else {
    // initiate xml parser for process input file
    var parser = new xml2js.Parser();

    parser.addListener('end', function(result) {
        // format object to be ready for import to MongoDB
        var json = parseXML(result);

        // finally save to file
        fs.writeFile(kml2json.output, JSON.stringify(json, null, 4), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log('Done – ' + json.length + ' records exported.');
            }
        });
    });

    // open input file for processing
    fs.readFile(kml2json.input, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            parser.parseString(data);
        }
    });

    /**
     * Get geo-position data from KML file
     * Format object to be ready for import to MongoDB
     *
     * @param object kml in json representation
     * @returns {*} final object ready for import into mongo
     */
    function parseXML(object) {
        var timestamps = object['kml']['Document'][0]['Placemark'][1]
            ['gx:MultiTrack'][0]['gx:Track'][0]['when'];

        var coordinates = object['kml']['Document'][0]['Placemark'][1]
            ['gx:MultiTrack'][0]['gx:Track'][0]['gx:coord'];

        var speed = object['kml']['Document'][0]['Placemark'][1]
            ['gx:MultiTrack'][0]['gx:Track'][0]['ExtendedData'][0]
            ['SchemaData'][0]['gx:SimpleArrayData'][0]['gx:value'];

        var json = [];
        for (var i = 0; i < coordinates.length; i++)
        {
            var row = {};
            row.time = new Date(timestamps[i]).getTime();
            row.speed = Number(speed[i]);
            row.acceleration = json[i-1] ? (row.speed - json[i-1].speed) /
                (row.time - json[i-1].time) * 1000 : 0;
            row.latitude = Number(coordinates[i].split(' ')[0]);
            row.longitude = Number(coordinates[i].split(' ')[1]);
            row.elevation = Number(coordinates[i].split(' ')[2]);
            json.push(row);
        }

        return json;
    }
}
