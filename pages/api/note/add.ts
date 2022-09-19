import connectMongo from "../../../utils/connectMongo";
import Note from "../../../models/note";
import { NextApiRequest, NextApiResponse } from "next";
import { allowCreate } from "../../../utils/misc";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addNote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!allowCreate(req.body.ip)) {
      res.status(403).json({ error: "forbbiden" });
      return;
    }

    await connectMongo();
    const newNote = req.body;
    delete newNote.ip;
    const note = await Note.create(newNote);

    res.status(201).json({ note });
  } catch (err) {
    res.status(400).json({ error: "Internal server error" });
  }
}
