import connectMongo from "../../../utils/connectMongo";
import Note from "../../../models/note";
import { allowCreate } from "@/utils/misc";
import { NextRequest } from "next/server";

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function GET(
  req: NextRequest
) {
  console.log("🚀 ~ req:", req.body)
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
          { title: { $regex: q, $options: "i" } },
          { text: { $regex: q, $options: "i" } },
        ],
      };
    const notes: any = await Note.find(params)
      .limit(100)
      .sort({ title: "asc" })
      .exec();

    return Response.json(notes);
  } catch (err) {
    return Response.json({ error: "Internal server error" });
  }
}

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json();
    if (!allowCreate(body.code)) {
      return Response.json({ error: "forbbiden" });

    }

    await connectMongo();
    const newNote = body;
    const note = await Note.create(newNote);

    return Response.json({ note });
  } catch (err) {
    return Response.json({ error: "Internal server error" });
  }
}
