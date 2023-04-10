import express, { request, response, Router } from "express";
import { note } from "./model.js";

export const appRouter = Router();

// create

appRouter.post("/create", (req, res) => {
  let noteDetails = new note({
    headline: req.body.headline,
    description: req.body.description,
  });
  noteDetails.save((err) => {
    if (err) {
      console.log(err);
    }
    res.send(noteDetails);
  });
});

//read

appRouter.get("/read", async (request, response) => {
  const read = await note.find({});

  try {
    response.send({
      data: read,
      message: "All notes",
      status: 200,
    });
  } catch (error) {
    response.send({
      data: null,
      message: error.message,
      status: 400,
    });
  }
});

//update

appRouter.patch("/:id", async (req, res) => {
  let noteData = await note.findByIdAndUpdate(req.params.id, req.body);
  await noteData.save();
  try {
    res.send({
      data: noteData,
      message: "updated",
      status: 200,
    });
  } catch (error) {
    res.send({
      data: null,
      message: error.message,
      status: 404,
    });
  }
});

//delete

appRouter.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  await note.findByIdAndDelete(req.params.id, { new: true });
  res.send("deleted");
});
