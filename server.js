
const express 		= require('express');
const app 			= express();
const bodyParser 	= require('body-parser');
const helmet 		= require('helmet');
var compression 	= require('compression');

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

app.use(helmet());
app.disable('x-powered-by');//if not used express

app.use(helmet.noCache())
app.use(helmet.frameguard())

app.use(helmet.contentSecurityPolicy({
  // Specify directives as normal. 
  directives: {
    defaultSrc: ["'self'", 'null'],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", 'style.com'],
    imgSrc: ["'self'", 'img.com', 'data:'],
    sandbox: [ 'allow-forms', 'allow-scripts'],
    reportUri: '/report-violation'
  },
  // Set to true if you only want browsers to report errors, not block them 
  reportOnly: true,
 
  // Set to true if you want to blindly set all headers: Content-Security-Policy, 
  // X-WebKit-CSP, and X-Content-Security-Policy. 
  setAllHeaders: false,
 
  // Set to true if you want to disable CSP on Android where it can be buggy. 
  disableAndroid: false,
 
  // Set to false if you want to completely disable any user-agent sniffing. 
  // This may make the headers less compatible but it will be much faster. 
  // This defaults to `true`. 
  browserSniff: true
}));

app.use(compression());

/************************************ End *****************************************/


app.use('/api',api);

//docs with swagger
app.use('/app_docs/',express.static('public'));
app.use('/images',express.static('./images'));

app.use('/*',function(req,res) {
	res.send("This url is not in our app");
});

app.listen(3000);