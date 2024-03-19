import connectMongo from "../../../utils/connectMongo";
import Word from "../../../models/word";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export async function GET(
  req: NextRequest,
) {
  try {
    await connectMongo();
    let paramsRaw = req.nextUrl.searchParams;
   
    const q = paramsRaw.get('q');
    const skip = paramsRaw.get('skip');
    const limit = paramsRaw.get('limit');
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
    return Response.json({ words, totalWords });
  } catch (err) {
    return Response.json({ error: "Internal server error" });
  }
}
