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

            return res.status(201).send({ 'status': 201, 'message': 'success', 'data': ack });

        } catch(e){

           console.log(e.message)
           return res.status(400).send({ 'status': 400, 'message': 'Something went wrong' });

        }
      },
      createUserAddress : async function(req, res) {
         try {

            // create address of a user 
            //req.body=(user_id,address_line1,address_line2,country,pincode,state,city)
            var inputs =req.body;
            var dto={};

            if( !inputs.address_line1 || !inputs.pincode || !inputs.state || !inputs.country ||!inputs.user_id){
               return res.status(400).send({ 'status': 400, 'message': 'Param(s) missing!' });
            }

            dto.address_line1=inputs.address_line1 || "NA";
            dto.address_line2=inputs.address_line2 ||  "NA";
            dto.pincode = inputs.pincode || 0;
            dto.country = inputs.country || "NA";
            dto.state=inputs.state ||"NA";
            dto.user_id=inputs.user_id;
             let query=`INSERT INTO user_address(address_line1,address_line2,pincode,country,state,user_id)
             values(?,?,?,?,?,?)`;

             let ack=await QueryService.Query(query, 
               [dto.address_line1,
               dto.address_line2,
               dto.pincode,
               dto.country,
               dto.state,
               dto.user_id]
               );
               return res.status(201).send({ 'status': 201, 'message': 'address created successfully', 'data': ack });

         } catch(e){
 
            console.log(e.message)
            return res.status(400).send({ 'status': 400, 'message': 'Something went wrong' });
 
         }
       },
       //TODO crete a GET API to fecth add address and user detail of a user
       /*
       data : { user: { name: "dajdbka", "phone" : 9672421899 , "email": djbakdka@xyz.com, address: {"line_1": "kathari"} }  }
       */      
};