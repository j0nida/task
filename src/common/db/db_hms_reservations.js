import PouchDB from 'pouchdb-browser';
import { default as PouchDBFind } from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

export const LiveHMSReservationsDB = new PouchDB('http://root:root@127.0.0.1:5984/hotel1_hms_reservations');
const HMSReservationsDB = new PouchDB('hotel1_hms_reservations'); //offline-local

HMSReservationsDB.sync(LiveHMSReservationsDB, {
    live: true,
    retry: true
});

HMSReservationsDB.on('error', e => console.log('HMS Reservations PouchDB Error', e));

export default HMSReservationsDB;
