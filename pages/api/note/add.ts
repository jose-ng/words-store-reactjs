import connectMongo from "../../../utils/connectMongo";
import Note from "../../../models/note";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addNote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const note = await Note.create(req.body);
    res.status(201).json({ note });
  } catch (err) {
    res.status(400).json({ error: "Internal server error" });
  }
}
