		var redis = require("redis"),
	    client = redis.createClient();

		module.exports={
			"save":function(username,password,done) {
				client.set(username, password);
				done(true);
			}
		}