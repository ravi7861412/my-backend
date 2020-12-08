const { transform } = require('async');
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
      getUserAddress : async function(req, res) {
         try {
            // create get request for user_address
             console.log("req:", req.query);  
             let rto={};
             let query1 = `SELECT * FROM users WHERE id=?`;
             rto.user = await QueryService.Query(query1, [req.query.id]);
             let query2 = `SELECT * FROM user_address WHERE user_id=?`;
            rto.user_address = await QueryService.Query(query2, [req.query.id]);
             
            
             console.log("user data", rto);
 
            return res.status(200).send({ 'status': 200, 'message': 'success', 'data': rto });
 
         } catch(e){
 
            console.log(e.message)
            return res.status(400).send({ 'status': 400, 'message': 'Something went wrong' });
 
         }
       },
      readAll: async function(req, res){

         try{
            const user_id = req.query.user_id;

            let quertiesList = [];

            let query_user = `SELECT * FROM users WHERE id=?`;

            quertiesList.push(QueryService.Query(query_user, [user_id]));

            let query_user_wallet = `SELECT * from wallet inner join mapping on wallet.id=mapping.wallet_id wHERE mapping.user_id=${user_id}`;

            quertiesList.push(QueryService.Query(query_user_wallet, [user_id]));

            

            
            var result = await Promise.all(quertiesList);
            console.log("**** result", result);
            return res.status(200).send({ 'status': 200, 'message': 'success', 'data': result });


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
       //TODO crete a GET API to fecth  address and user detail of a user
       /*
       data : { user: { name: "dajdbka", "phone" : 9672421899 , "email": djbakdka@xyz.com, address: {"line_1": "kathari"} }  }
       */      
// creating a api for participating in the contest
//            enterGame :  async function(req, res) {
//                    try {
//                         console.log("req:", req.query);
//                         let query = `SELECT * from wallet inner join mapping on wallet.id=mapping.wallet_id wHERE mapping.user_id=?`;
//                         let data = await QueryService.Query(query, [req.query.user_id]);
//                         console.log(data);
                     
//                         let discount=req.query.dis;
//                         let contestFee=req.query.fee;
//                           discount=contestFee*(discount/100);
//                           contestFee -= discount;
//                         let wal=data[0].winning+data[0].bonus+data[0].deposit;
                  
//                         if(contestFee>wal){
                     
//                            return res.status(400).send({ 'status': 400, 'message': 'Not enough money in your fanFightWallet' });
//                                           }
//                        else{
//                              if(contestFee==data[0].fanFight_Wallet){
//                                        data[0].winning=0;
//                                        data[0].deposit=0;
//                                        data[0].bonus=0;            }
//                               else{
//                                    let alllowed_bonus=0.1*contestFee;
//                                       if(contestFee<alllowed_bonus)
//                                       {
//                                          data[0].bonus-=contestFee;
//                                       }
//                                       else{
//                                             contestFee=contestFee-alllowed_bonus;
//                                            data[0].bonus-=alllowed_bonus; 
                                            
//                                            if(contestFee<data[0].deposit)
//                                            {
//                                               data[0].deposit-=contestFee;
//                                            }
//                                            else{
//                                               contestFee-=data[0].deposit;
//                                               data[0].deposit=0;
//                                               data[0].winning=data[0].winning-contestFee;
//                                            }


//                                          }
//                                   }
                                 
//                                   data[0].fanFight_Wallet=data[0].bonus+data[0].deposit+data[0].winning;
//                                   wal=data[0].winning+data[0].bonus+data[0].deposit;
//                                   let query = `UPDATE wallet SET winning=${data[0].winning},bonus=${data[0].bonus},deposit=${data[0].deposit},fanFight_wallet=${wal} Where wallet.id=${req.query.user_id}`;
//                                   let ack = await QueryService.Query(query);
                                  
//                                      query = `SELECT * from wallet inner join mapping on wallet.id=mapping.wallet_id wHERE mapping.user_id=?`;
//                                      data = await QueryService.Query(query, [req.query.user_id]);
//                                  return res.status(200).send({ 'status': 200, 'message': 'Your Entry in confirmed', 'data': data });
                            
                                 

                                 
//                            }
                         


   

//                   } catch(e){

//                         console.log(e.message)
//                         return res.status(400).send({ 'status': 400, 'message': 'Something went wrong' });

//    }
//  }




};




