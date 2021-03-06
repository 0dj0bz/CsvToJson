var http = require("http");
var express = require("express");
var app = express();
var formidable = require("formidable");
var fs = require("fs");



app.set('port', process.env.port|| 8081);

app.listen(app.get('port'), function() {
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});

app.post('/', function(req, res){

	var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        if(err) return res.redirect(303, '/error');

        fs.readFile ( files.filename.path, function (err, data) {
        	if (err) throw err;
        	res.type ('text/json');

            var jres = processArray (data);

            //var jstr =  '{ "a": 1, "b":2, "c":3  }';

            // var jstr2 = JSON.stringify(jres);

            console.log (jres);

            var jarry = JSON.parse(jres);

            console.log('jarry.transactions[1].year: ' + jarry.transactions[1].Year);

            res.send (jarry);
 

        });

    });	

    
    app.use(function(req, res){
            res.type('text/plain');
            res.status(303);
            res.send('File successfully uploaded.');
    });
});

function processArray (buffer) 
{
    //var inBufStr = buffer.toString().replace("\"", " ");
    //inBufStr2 = inBufStr.replace(",", " ");
    //inBufStr3 = inBufStr2.replace(":", " ");

    var darry = buffer.toString().split("\r");

    var outStr = new String();

    outStr = "{  \n  \"transactions\" : [\n";

    var colheads = darry[0].split(",");

    for (idx=1;idx<darry.length;idx++) {

        outStr += "    {  \n";

        var arry = darry[idx].split(",");

        for (jdx=0;jdx<colheads.length;jdx++) {

            outStr += "      \"" + colheads[jdx] + "\":\"" +  arry[jdx] + "\"";      
            if (jdx < colheads.length-1) outStr += ", " 
            outStr += " \n"  
        }

        outStr += "    }\n";

        if (idx < darry.length-1) outStr += ', ';


    }

    outStr += "]}";

    return outStr;


}