import { config } from "~/config";
import { baseFetcher } from "~/services/base";

const fetcher = baseFetcher.extend({ prefixUrl: config.services.endpoints.upload });

export async function createArtist({
  userId,
  name,
  bio,
}: {
  userId: string;
  name: string;
  bio: string;
}) {
  return await fetcher.post("artists", {
    json: {
      user_id: userId,
      name,
      bio,
    },
  });
}
