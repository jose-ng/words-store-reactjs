import mongoose, { Schema, model, models } from "mongoose";

const wordSchema = new Schema({
  text_es: String,
  text_en: String,
  rating: {
    type: Number,
    min: -100000,
    max: 100000,
  },
  group: Number
});

const Word = models.Word || model("Word", wordSchema);

export default Word;

export interface FormWord {
  text_en?: string;
  text_es?: string;
}
