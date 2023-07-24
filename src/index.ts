import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

import { Server } from "http";
import { connectToDBServer } from "./db/conn";
import { Server as SocketServer } from "socket.io";
import { MongoClient } from "mongodb";

import http from "http";
let server: Server;

function exitHandler() {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}

function unexpectedErrorHandler(error: any) {
  console.log("Unexpected Error 💥");
  console.error(error);
  exitHandler();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

if (isNaN(Number(process.env.PORT))) {
  throw new Error("PORT must be a number.");
}
const PORT: number = Number(process.env.PORT);

connectToDBServer((err) => {
  if (err) {
    throw err;
  }

  console.log("Connected to Database!");

  import("./app")
    .then(({ initializeApp }) => {
      const app = initializeApp();

      const server2 = http.createServer(app);
      const io = new SocketServer(server2);
      const mongoURI = process.env.DATABASE_URL as string; // Replace with your MongoDB URI
      const dbName = process.env.DB_NAME;
      const collectionName = "stops";

      io.on("connection", (socket) => {
        console.log("A user connected!");

        // Check if the socket is connected

        console.log("Socket is connected:", socket);

        // Handle disconnection event
        socket.on("disconnect", () => {
          console.log("A user disconnected!");
        });
      });

      io.on("error", (error: Error) => {
        console.error("Socket.IO server error:", error);
        throw error; // Throw the error to terminate the server process or handle it in a custom way.
      });

      async function watchCollection() {
        const client = await MongoClient.connect(mongoURI);

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const stops = await collection.watch();

        stops.on("change", (change) => {
          // Emit the change data to all connected clients
          io.emit("insertion", change);
          console.log("Change detected in the collection:", change);
        });
      }

      watchCollection().catch(console.error);

      server = server2.listen(PORT, () => {
        console.log(
          `Server is listening on PORT ${PORT} - http://${process.env.HOSTNAME}`
        );
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});
