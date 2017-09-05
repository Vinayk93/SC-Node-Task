
const express 	= require('express');
const app 		= express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({           // parse application/x-www-form-urlencoded
  extended: true,
  uploadDir: './hunarfiles',
  limit: '150mb',
}));
/**
 * [api folder contains all api routes and defination]
 */
const api 		= require('./api/index');

/************************8security protocols ************************************/















/************************************ End *****************************************/







app.use('/api',api);

//docs with swagger
app.use('/app_docs',express.static('public'));
app.use('/images',express.static('./images'));


app.listen(3000);