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
    const { q, skip, limit } = body;
    let params = {};
    if (q)
      params = {
        $or: [
          { text_en: { $regex: q, $options: "i" } },
          { text_es: { $regex: q, $options: "i" } },
        ],
      };
    const words = await Word.find(params)
      .skip(skip * limit)
      .limit(limit)
      .sort({ rating: "desc" })
      .exec();
    const totalWords = await Word.count(params).exec();
    res.status(200).json({ words, totalWords });
  } catch (err) {
    res.status(400).json({ error: "Internal server error" });
  }
}
