import ky from "ky";
import { getAccessToken } from "~/services/auth0";
import { baseFetcher } from "~/services/base";

const fetcher = baseFetcher.extend({ prefixUrl: "http://localhost:3000/metadata" });

type Song = {
  id: string;
};

export function getSong(id: string) {
  return fetcher.get(`/${id}`).json<Song>();
}
