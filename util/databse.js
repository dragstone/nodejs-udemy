// const mysql = require("mysql2");
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "Anurekha@123",
//   port: 3306,
// });

// module.exports = connection.promise();

// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("node-complete", "root", "Anurekha@123", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://Asmiriti:6CGbzUgkTPRPrGXE@cluster0.cfspp.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      _db = client.db();
      callback();
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
