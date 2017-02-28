var express = require('express');
var json = require('jsonify');
var multer  = require('multer');
var upload = multer({ dest: './' });
var cmd = require('node-cmd');
var app = express();
var op='';
app.get('/', function(req, res)	{
  res.send('listening');
});


app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
 	 console.log(req.file);
 	 console.log(req.body);
 	 var str='python script.py '+req.file.filename;
 	 cmd.get(str,function(data){
 	 op=console.log(data);
 	 res.send(data)
	});
});

//var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
//app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
//});

/*
var options = {
  mode: 'text',
  pythonPath: '/usr/lib/python2.7',
  pythonOptions: ['-u'],
  scriptPath: '/home/ubuntu/l3test',
  args: ['/home/ubuntu/l3test/VGG_S_rgb/demo_image.png']
};

var shell = new PythonShell('script.py', options, { mode: 'text '});
var data = shell.receive();

var PythonShell = require('python-shell');
//you can use error handling to see if there are any errors
app.get('/emotions',function(req,res){
	PythonShell.run('script.py', options, function (err, results) { 
		if (err) throw err;
		console.log('Result is', results);
	});
});
*/

app.listen(8080, function()	{
	console.log('Server Listening at 8080');
});


