import PouchDB from 'pouchdb-browser';
import { default as PouchDBFind } from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

export const LiveFinanceTransactionsDB = new PouchDB('http://root:root@127.0.0.1:5984/hotel1_finance_transactions');
const FinanceTransactionsDB = new PouchDB('hotel1_finance_transactions');//offline-local

FinanceTransactionsDB.sync(LiveFinanceTransactionsDB, {
    live: true,
    retry: true
});

FinanceTransactionsDB.on('error', (e) => console.log("Finance Transactions PouchDB Error", e));

export default FinanceTransactionsDB;