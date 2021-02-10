import db from './db_hms'; //HmsDB as db

export { default as Model } from './Model';
export { default as HmsDB , LiveHmsDB } from './db_hms';
//TODO: IF NEEDED IN THE FUTURE WE COULD YOU MULITPLE DBs
//      BUT WE WOULD NEED TO REPLICATE THE SAME USERS ON EACH 
//export { default as HMSReservationsDB } from './db_hms_reservations';
//export { default as FinanceTransactionsDB } from './db_finance_transactions';


// db.info().then(function (info) {
//     console.log(info);
//   });


  
  // db.put(todo, function callback(err, result) {
  //   if (!err) {
  //     console.log('Successfully posted a todo!');
  //   }else{
  //     console.log(err);
  //   }
  // });

  db.on('error', (e) => console.log("PouchDB Error", e));


export default db;