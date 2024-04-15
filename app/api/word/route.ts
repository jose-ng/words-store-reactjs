import connectMongo from "../../../utils/connectMongo";
import Word from "../../../models/word";
import { NextRequest } from "next/server";
import { allowCreate } from "@/utils/misc";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export async function GET(
  req: NextRequest
) {
  try {
    await connectMongo();
    let paramsRaw = req.nextUrl.searchParams;

    const q = paramsRaw.get('q');
    const skip = paramsRaw.get('skip') || 0;
    const limit = paramsRaw.get('limit') || 10;
    let params = {};
    if (q)
      params = {
        $or: [
          { text_en: { $regex: q, $options: "i" } },
          { text_es: { $regex: q, $options: "i" } },
        ],
      };
    const words = await Word.find(params)
      .skip(<number>skip * <number>limit)
      .limit(<number>limit)
      .sort({ rating: "desc" })
      .exec();
    const totalWords = await Word.count(params).exec();
    return Response.json({ words, totalWords });
  } catch (err) {
    return Response.json({ error: "Internal server error" });
  }
}

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();
    if (!allowCreate(body.code)) {
      return Response.json({ error: "forbbiden" });      
    }

    await connectMongo();
    const newWord = body;
    delete newWord.code;
    const word = await Word.create(newWord);
    return Response.json({ word });
  } catch (err) {
    return Response.json({ error: "Internal server error" });
  }
}

export async function PATCH(
  req: Request
) {
  try {
    const body = await req.json();
    if (!allowCreate(body.code)) {
      return Response.json({ error: "forbbiden" });      
    }

    await connectMongo();
    const word = await Word.findById(body.id).exec();
    const updated = await Word.findOneAndUpdate(
      { _id: body.id },
      { rating: (word.rating || 0) + body.rating },
      { new: true }
    ).exec();

    return Response.json({ updated });
  } catch (err) {
    return Response.json({ error: "Internal server error" });
  }
}
