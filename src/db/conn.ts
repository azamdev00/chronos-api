import { AnyError, Db, MongoClient } from "mongodb";

const connectionString = process.env.DATABASE_URL!;

const client = new MongoClient(connectionString);

let dbConnection: Db;

export const connectToDBServer = function (callback: (err?: AnyError) => void) {
  client
    .connect()
    .then(async () => {
      dbConnection = client.db(process.env.DB_NAME!);
      return callback();
    })
    .catch((err: any) => {
      return callback(err);
    });
};

export const getDb = function () {
  return dbConnection;
};
