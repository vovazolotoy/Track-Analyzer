# Track-Analyzer
Have you ever wondered how your driver is representing your company with his driving style?

This small toolkit is example of Mongo MapReduce for analyze "My Tracks" GPS data for finding harsh braking and rapid acceleration.


## Table of Content
* [Export data from "My Tracks" to JSON](#export)
* [Import data into MongoDB](#import)
* [MongoDB MapReduce Data Analyzing](#analyzing)


<a name="export"/>
## Export data from "My Tracks" to JSON
[My Tracks](http://en.wikipedia.org/wiki/MyTracks) GPS tracking application use [Keyhole Markup Language (KML) ](http://en.wikipedia.org/wiki/KML) files for store geo data. For export this geo data to json format was created **kml2json** cli application.
```
 Usage: kml2json [options]

 Options:

 -h, --help           output usage information
 -V, --version        output the version number
 -i, --input [file]   input kml file
 -o, --output [file]  output json file
```
```
$ kml2json -i tracks/2.kml -o tracks/2.json
Done – 442 records exported.
```
Example of record (time is in milliseconds)
```
    {
        "time": 1408215039029,
        "speed": 4.952657,
        "acceleration": 0.10101690870522967,
        "latitude": -115.17242,
        "longitude": 36.057326,
        "elevation": 676.5
    }
```


<a name="import"/>
## Import data into MongoDB
JSON data returned from **kml2json** can be imported with **mongoimport**
```
$ mongoimport --db geo --collection tracks < tracks/2.json --jsonArray
```
```
connected to: 127.0.0.1
Sun Aug 17 16:24:46.749 check 9 442
Sun Aug 17 16:24:46.778 imported 442 objects
```


<a name="analyzing"/>
## MongoDB MapReduce Data Analyzing

Let's define harsh braking as: -5mph(-2,22mps)/sec for >= 3 seconds.

Rapid acceleration: 5mph(2,22mps)/sec for >= 3 seconds.