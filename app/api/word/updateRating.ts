import connectMongo from "../../../utils/connectMongo";
import Word from "../../../models/word";
import { NextApiRequest, NextApiResponse } from "next";
import { allowCreate } from "../../../utils/misc";
import mongoose from "mongoose";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function updateRating(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!allowCreate(req.body.ip)) {
      res.status(403).json({ error: "forbbiden" });
      return;
    }

    await connectMongo();
    const word = await Word.findById(req.body.id).exec();
    const updated = await Word.findOneAndUpdate(
      { _id: req.body.id },
      { rating: (word.rating || 0) + req.body.rating },
      { new: true }
    ).exec();

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
