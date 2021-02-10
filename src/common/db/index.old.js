import PouchDB from 'pouchdb-browser';
import {default as PouchDBFind} from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);//PouchDB.plugin(require('pouchdb-find').default);

export { default as Model } from './Model';

//https://pouchdb.com/external.html
//https://github.com/jo/pouch-resolve-conflicts
//https://python-pouchdb.marten-de-vries.nl/plugins.html
//https://github.com/chunksnbits/store.pouchdb
//https://github.com/pouchdb-community/pouchdb-authentication (/blob/master/docs/setup.md)

//https://github.com/emarchak/react-pouch/blob/master/app/util/dbHelper.js
//https://github.com/bradley-holt/offline-first

//https://jamesadam.me/2014/11/09/couchdb-authorization/
/*
const db = new PouchDB('http://root:root@127.0.0.1:5984/hotel1');
*/
const remote = new PouchDB('http://root:root@127.0.0.1:5984/hotel1_hms');
const db = new PouchDB('hotel1_hms_offline');

//https://pouchdb.com/api.html#sync
db.sync(remote, {
    live: true,   // do a live, ongoing sync
    retry: true   // retry if the connection is lost
});


/* https://pouchdb.com/api.html#create_database
var db = new PouchDB('http://localhost:5984/hotel1', {
    auth: {
        username: 'root',
        password: 'root'
    }
});


console.log("Local database created");
db.bulkDocs([
    { _id: "2014-11-12T23:27:03.794Z", type: "users", username: "something", pass: "secret" },
    { _id: "2014-11-13T00:52:01.471Z", type: "users", username: "something", pass: "secret"},
    { _id: "2014-11-13T01:39:28.911Z", type: "roles", name: "admin" },
    { _id: "2014-11-13T02:52:01.471Z", type: "users", username: "something", pass: "secret"}
]).catch(function (error) {
    console.log(error);
});


db.info().then(function (info) {
    console.log(info);
})
*/
db.on('error', (e) => console.log("PouchDB Error", e));
/*
PouchDB.debug.enable('*');

PouchDB.debug.disable();
*/

export default db;