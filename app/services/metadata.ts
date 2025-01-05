import { config } from "~/config";
import { baseFetcher } from "~/services/base";

const fetcher = baseFetcher.extend({ prefixUrl: config.services.endpoints.metadata });

type Song = {
  id: string;
};

export function getSong(id: string) {
  return fetcher.get(`/${id}`).json<Song>();
}
