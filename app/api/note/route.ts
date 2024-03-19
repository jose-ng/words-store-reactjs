import connectMongo from "../../../utils/connectMongo";
import Note from "../../../models/note";

/**
 * @param {Request} req
 * @param {Response} res
 */
export async function GET(
  req: Request,
  
) {
  console.log(req)
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
    const notes: any = await Note.find(params)
      .limit(100)
      .sort({ title: "asc" })
      .exec();

    return Response.json(notes);
  } catch (err) {
    return Response.json({ error: "Internal server error" });
  }
}
