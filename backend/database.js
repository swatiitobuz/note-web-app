import mongoose from "mongoose";
import { username, password, cluster, dbname } from "./config.js";
export function databaseConnect(){
    mongoose.connect(
        `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      
      const db = mongoose.connection;
      db.on("error", () => {
        console.log("connectionError");
      });
      db.once("open", function () {
        console.log("Connected successfully");
      });
}