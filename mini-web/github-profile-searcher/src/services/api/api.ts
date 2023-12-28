import { AxiosRequestConfig, isAxiosError } from 'axios';
import { client } from './client';

export class API {
  private async sendGet(path: string, config?: AxiosRequestConfig) {
    try {
      const res = await client.get(path, config);
      return res.data;
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response) {
          return err.response.data;
        } else {
          return { error: 'Unkown error', message: err.message };
        }
      }
    }
  }

  async user(username: string) {
    return await this.sendGet(`/users/${username}`);
  }
}
