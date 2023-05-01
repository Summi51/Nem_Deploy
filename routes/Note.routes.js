const express = require("express");

const noteRouter = express.Router();

const { NoteModel } = require("../model/Note.model");

noteRouter.post("/create", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "A new note has been added" });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ authorID: req.body.authorID });
    res.status(200).send(notes);
  } catch (error) {
    res.status(400).send(error);
  }
});

noteRouter.patch("/update/:noteID", async (req, res) => {
  const { noteID } = req.params;
  const note = await NoteModel.findOne({ _id: noteID });
  try {
    if (req.body.authorID !== note.authorID) {
      res.status(200).send({ msg: `You are not authorised to do that!!` });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res
        .status(200)
        .send({ msg: `The note with id:${noteID} has been updated` });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

noteRouter.delete("/delete/:noteID", async (req, res) => {
  const { noteID } = req.params;
  const note = await NoteModel.findOne({ _id: noteID });
  try {
    if (req.body.authorID !== note.authorID) {
      res.status(200).send({ msg: `You are not authorised to do that!!` });
    } else {
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res
        .status(200)
        .send({ msg: `The note with id:${noteID} has been Deleted` });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = {
  noteRouter,
};

