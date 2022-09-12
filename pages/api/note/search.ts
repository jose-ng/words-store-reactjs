import connectMongo from "../../../utils/connectMongo";
import Note from "../../../models/note";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function searchNote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const { body } = req;
    const q = body;
    let params = {};
    if (q)
      params = {
        $or: [
          { title: { $regex: q, $options: "i" } },
          { text: { $regex: q, $options: "i" } },
        ],
      };
    const notes = await Note.find(params)
      .limit(10)
      .sort({ title: "asc" })
      .exec();
    res.status(200).json(notes);
  } catch (err) {
    res.status(400).json({ error: "Internal server error" });
  }
}
