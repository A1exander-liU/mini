import { client } from './client';

export class API {
  static async queryFood(query: string) {
    const res = await client.get(`/v1/food/${query}`);
    return res.data;
  }
}
