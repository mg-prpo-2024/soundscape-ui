import ky from "ky";
import { getAccessToken } from "~/services/auth0";

export const baseFetcher = ky.create({
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = await getAccessToken();
        request.headers.set("Authorization", "Bearer " + token);
      },
    ],
  },
});
