		const express 		= require('express');
		const router 		= express.Router();
		/** 
		 * external libraries
		 * [ pino is a Logging/Debugging tool ]
		 * [ jsonpatch is a json patch library]
		 */
		const pino 			= require('pino')();
		const jsonpatch 	= require('json-patch');
		const download 		= require('download');
		const Jimp 			= require("jimp");
		/**
		 * internal functions location
		 * create get and update functions 
		 */
		const redis 		= require('./redis.js');
		const jwt 			= require('./jwt.js');
		

 		function validation_middleware(req,res,next){
 			let valid=false;
 			if(req.body.username != undefined){
 				if(req.body.password != undefined){
 						valid=true;
 						next();
 				}
 			}
 			if(valid == false){
 				pino.warn('{username and password invalid}');
 				res.send('{"code":401, "error":"values are empty","result":""}');
 			}
 		}

		router.get('/',(req,res)=> {
			res.send("This is the public api");
		});

		/**
		 * [Login gateway]
		 * @param  {[type]} '/login'          [url: /login]
		 * @param  {[type]} validation_middleware [used to check if username and passward present in the req]
		 * @param  {[type]} (req,res          [Requesting,Responding]
		 * @return {[type]}                   [Return in JSON format code error result]
		 */
		router.post('/login',validation_middleware,(req,res)=>{
			//fetch the details here with particular redis
			redis.save(req.body.username,req.body.password,function(done){
				if(done == true){
					pino.info('{status:ADD,username:'+req.body.username+',password::'+req.body.password+'}')
					res.send('{"code":200,"error":"null","result":'+jwt.CreateJwt(req.body.username,req.body.password)+'}' );
				}else{
					res.send('{"code":301,"error":"cannot do action here","result":null}');
				}
			});
		});

		/**
		 * @description middleware used for authentication purposes
		 * @param  {request}
		 * @param  {[response]}
		 * @param  {Function for moving to next or not }
		 * @return {[next or res]}
		 */
		function check_middleware(req,res,next) {
			pino.info("we have it");
			// jwt.CreateJwt();
			next();
		}
		router.use('/',check_middleware)
		router.post('/json_patch',(req,res)=>{
			pino.info(req.body);
			res.send('{"code":200,error:null,"result:'+JSON.stringify(jsonpatch.apply(req.body.json,req.body.patch) ) +'}');
		});

		router.post('/upload',(req,res)=>{
				let p=req.body[0].split("/");
				    Jimp.read(req.body[0], function (err, lenna) {
						    if (err) throw err;
						    lenna.resize(50, 50)
						         .write("./images/"+p[p.length-1] );
						         res.send('{"code":200,"error":"null","result":localhost:3000/images/'+p[p.length-1]+'}' );
						});
			
		});


		module.exports = router;

