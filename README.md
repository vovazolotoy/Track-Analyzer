# Track-Analyzer
Small toolkit  for analyze "My Tracks" gps data with Mongo MapReduce


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


<a name="import"/>
## Import data into MongoDB
JSON data returned from **kml2json** can be imported with **mongoimport**
```
$ mongoimport --db geo --collection tracks < tracks/2.json --jsonArray
```


<a name="analyzing"/>
## MongoDB MapReduce Data Analyzing
