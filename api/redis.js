		var redis = require("redis"),
	    client = redis.createClient();

		module.exports={
			"save":function(username,password,done) {
				client.set(username, password);
				done(true);
			},
			"find":function(content,done){
				client.get(content.username,function(err,reply){
					if(err) done(false);
					if(reply==content.password){
						done(true);
					}else{
						done(false);
					}
				})
			}

		}