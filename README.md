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


<a name="import"/>
## Import data into MongoDB


<a name="analyzing"/>
## MongoDB MapReduce Data Analyzing
