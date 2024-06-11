
import { FormWord } from '@/models/word';
import { axiosInstance } from '../utils/customAxios';

export default class WordService {
  static instance: WordService | null = null;

  static create() {
    if (WordService.instance === null) {
      WordService.instance = new WordService();
    }
    return WordService.instance;
  }

  async getAllWords(query: string, skip: number = 0, limit: number = 10) {
    const queryGQL = {
      query: `
      query ($query: String, $skip: Int, $limit: Int) {
        words(query: $query, skip: $skip, limit: $limit) {
          list {
            id,
            text_es,
            text_en,
            rating
          },
          total
        }
      }
    `,
      variables: {
        query,
        skip,
        limit
      },
    };
    const res = await axiosInstance('apiDomain').post('/graphql', queryGQL);
    const { errors, words } = res.data.data;
    if (errors) throw new Error(errors[0].message);
    return words;
  }

  async addWord(text_en: string, text_es: string) {
    const queryGQL = {
      query: `
      mutation ($dto: AddWordDto!) {
        addWord(dto: $dto) {
          id,
          text_es,
          text_en,
          rating
        }
      }
    `,
      variables: {
        dto: {
          text_en,
          text_es,
        }
      },
    };
    const res = await axiosInstance('apiDomain').post('/graphql', queryGQL);
    debugger
    const { errors, addWord: word } = res.data.data;
    if (errors) throw new Error(errors[0].message);
    return word;
  }
}
