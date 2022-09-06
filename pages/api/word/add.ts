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
    await connectMongo();
    const word = await Word.create(req.body);
    res.json({ word });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
