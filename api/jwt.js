		const jwt 		= require('jwt-simple');
		const secret = 'This is high secret key';

		module.exports = {
			"CreateJwt":function (username,password) {
				var payload={
					username,
					password
				};

				return jwt.encode(payload,secret);
			},
			"to_payload":function(token,cb){
				 cb(jwt.decode(token,secret));
			}
		};
