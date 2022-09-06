import { Schema, model, models } from 'mongoose';

const wordSchema = new Schema({
  text_es: String,
  text_en: String,
});

const Word = models.Word || model('Word', wordSchema);

export default Word;