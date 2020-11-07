const QueryService = require('./../../services/preparedQueryService');

module.exports = {
    getUser : async function(req, res) {
        try {
            console.log("req:", req.query);
            let query = `SELECT * FROM users WHERE id=?`;
            let data = await QueryService.Query(query, [req.query.id]);
            console.log("user data", data);

           return res.status(200).send({ 'status': 200, 'message': 'success', 'data': data });

        } catch(e){

           console.log(e.message)
           return res.status(400).send({ 'status': 400, 'message': 'Something went wrong' });

        }
      },
     createUser : async function(req, res) {
        try {
			console.log("req body:", req.body);
			let inputs = req.body;
			const now = parseInt(Date.now()/1000);

			let query = `INSERT INTO users (first_name, last_name, phone, email, created_by, created_dt, updated_by, updated_dt)
			VALUES (?, ?, ?, ?, ?, ?, ?, ? );`;
			let ack = await QueryService.Query(query, [inputs.first_name, inputs.last_name, inputs.phone, inputs.email, 1, now, 1, now]);

            return res.status(200).send({ 'status': 200, 'message': 'success', 'data': ack });

        } catch(e){

           console.log(e.message)
           return res.status(400).send({ 'status': 400, 'message': 'Something went wrong' });

        }
      },
};