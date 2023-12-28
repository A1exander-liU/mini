import { AxiosRequestConfig, isAxiosError } from 'axios';
import { client } from './client';

export class API {
  private static async sendGet(path: string, config?: AxiosRequestConfig) {
    try {
      const res = await client.get(path, config);
      console.log(res.data);
      return res.data;
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response) {
          console.log(err.response.data);
          return err.response.data;
        } else {
          console.log({ error: 'Unknown error', message: err.message });
          return { error: 'Unkown error', message: err.message };
        }
      }
    }
  }

  static async user(username: string) {
    return await this.sendGet(`/users/${username}`);
  }
}
