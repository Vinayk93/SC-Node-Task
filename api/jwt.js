		const jwt 		= require('jwt-simple');
		const secret = 'This is high secret key';

		module.exports = {
			"CreateJwt":function (username,password) {
				var payload={
					username,
					password
				};

				return jwt.encode(payload,secret);
			}
		};
