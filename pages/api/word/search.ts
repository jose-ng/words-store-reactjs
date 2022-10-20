import connectMongo from "../../../utils/connectMongo";
import Word from "../../../models/word";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function searchWord(
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
          { text_en: { $regex: q, $options: "i" } },
          { text_es: { $regex: q, $options: "i" } },
        ],
      };
    const words = await Word.find(params)
      .limit(200)
      .sort({ text_en: "asc" })
      .exec();
    res.status(200).json(words);
  } catch (err) {
    res.status(400).json({ error: "Internal server error" });
  }
}
