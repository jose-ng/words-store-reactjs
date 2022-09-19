import connectMongo from "../../../utils/connectMongo";
import Word from "../../../models/word";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addWord(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body.ip, process.env.IP)
    if (req.body.ip != process.env.IP) {
      res.status(403).json({ error: "forbbiden" });
      return;
    }

    await connectMongo();
    const newWord = req.body;
    delete newWord.ip;
    const word = await Word.create(newWord);

    res.status(201).json({ word });
  } catch (err) {
    res.status(400).json({ error: "Internal server error" });
  }
}
