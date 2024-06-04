

import { axiosInstance } from '../utils/customAxios';

export default class NoteService {
  static instance: NoteService | null = null;

  static create() {
    if (NoteService.instance === null) {
        NoteService.instance = new NoteService();
    }
    return NoteService.instance;
  }

  async getAllNotes(query: string, skip: number = 0, limit: number = 10) {
    const queryGQL = {
      query: `
      query ($query: String, $skip: Int, $limit: Int) {
        notes(query: $query, skip: $skip, limit: $limit) {
          list {
            id,
            title,
            text,
            urlImg
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
    const { errors, notes } = res.data.data;
    if (errors) throw new Error(errors[0].message);
    return notes;
  }
}
