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
        console.log('received fields:');
        console.log(fields);
        console.log('received files:');
        console.log(files);

        fs.readFile ( files.filename.path, function (err, data) {
        	if (err) throw err;
        	console.log (data);
        	res.type ('text/plain');
        	res.send (data);

        });


    });	

    
app.use(function(req, res){
        res.type('text/plain');
        res.status(303);
        res.send('File successfully uploaded.');
});
});