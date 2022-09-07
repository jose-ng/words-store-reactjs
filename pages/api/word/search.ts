import connectMongo from "../../../utils/connectMongo";
import Word from "../../../models/word";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function seachWord(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const {body} = req;
    const q = body;
    const words = await Word.find({}).exec();
    res.status(200).json(words);
  } catch (err) {
    res.status(400).json({ error: "Internal server error" });
  }
}
