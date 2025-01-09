import { config } from "~/config";
import { baseFetcher } from "~/services/base";

const fetcher = baseFetcher.extend({ prefixUrl: config.services.endpoints.metadata });

type Album = {
  id: string;
  title: string;
  created_at: string;
  artist: {
    id: string;
    name: string;
  };
};

export async function getAlbums() {
  return await fetcher.get("albums").json<Album[]>();
}

export async function getAlbum(id: string) {
  return await fetcher.get<Album>(`albums/${id}`).json();
}

type Song = {
  id: string;
  title: string;
};

export async function getAlbumSongs(id: string) {
  return await fetcher.get(`albums/${id}/songs`).json<Song[]>();
}
