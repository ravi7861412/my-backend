const { transform } = require('async');
const QueryService = require('./../../services/preparedQueryService');

module.exports={
    enterGame :  async function(req, res) {
        try {
             console.log("req:", req.query);
             let query = `SELECT * from wallet inner join mapping on wallet.id=mapping.wallet_id wHERE mapping.user_id=?`;
             let data = await QueryService.Query(query, [req.query.user_id]);
             console.log(data);
          
             let discount=req.query.dis;
             let contestFee=req.query.fee;
               discount=contestFee*(discount/100);
               contestFee -= discount;
             let wal=data[0].winning+data[0].bonus+data[0].deposit;
       
             if(contestFee>0.1*contestFee+data[0].deposit+data[0].winning||contestFee>wal){
               
                return res.status(400).send({ 'status': 400, 'message': 'Not enough money in your fanFightWallet' });
                               }
            else{
                  if(contestFee==data[0].fanFight_Wallet){
                            data[0].winning=0;
                            data[0].deposit=0;
                            data[0].bonus=0;            }
                   else{
                        let alllowed_bonus=0.1*contestFee;
                           if(contestFee<alllowed_bonus)
                           {
                              data[0].bonus-=contestFee;
                           }
                           else{
                                 contestFee=contestFee-alllowed_bonus;
                                data[0].bonus-=alllowed_bonus; 
                                 
                                if(contestFee<data[0].deposit)
                                {
                                   data[0].deposit-=contestFee;
                                }
                                else{
                                   contestFee-=data[0].deposit;
                                   data[0].deposit=0;
                                   data[0].winning=data[0].winning-contestFee;
                                }


                              }
                       }
                      
                       data[0].fanFightFightFight_Wallet=data[0].bonus+data[0].deposit+data[0].winning;
                       wal=data[0].winning+data[0].bonus+data[0].deposit;
                       let query = `UPDATE wallet SET winning=${data[0].winning},bonus=${data[0].bonus},deposit=${data[0].deposit},fanFight_wallet=${wal} Where wallet.id=${req.query.user_id}`;
                       let ack = await QueryService.Query(query);
                       
                          query = `SELECT * from wallet inner join mapping on wallet.id=mapping.wallet_id wHERE mapping.user_id=?`;
                          data = await QueryService.Query(query, [req.query.user_id]);
                      return res.status(200).send({ 'status': 200, 'message': 'Your Entry in confirmed', 'data': data });
                 
                      

                      
                }
              




       } catch(e){

             console.log(e.message)
             return res.status(400).send({ 'status': 400, 'message': 'Something went wrong' });

}
}
};