"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbCon_1 = require("./dbCon");
dbCon_1.db.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch((err) => console.log('Unable to connect to the database: ', err));
dbCon_1.db.sync()
    .then(() => {
    console.log('Sync successfully');
})
    .catch((err) => {
    console.log('Error in sync ' + err);
});
exports.default = dbCon_1.db;
