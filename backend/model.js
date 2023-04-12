import mongoose from "mongoose";
const mySchema = new mongoose.Schema({
  headline: {
    type: String,
  },
  description: {
    type: String,
  },
});
export const note = mongoose.model("noteDatas", mySchema);
