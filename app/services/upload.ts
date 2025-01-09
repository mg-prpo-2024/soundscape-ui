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

export type Artist = {
  id: string;
  user_id: string;
  name: string;
  bio: string;
};

export async function getArtist(userId: string) {
  return await fetcher.get<Artist>(`artists/${userId}`).json();
}

export type Album = {
  id: string;
  title: string;
  created_at: string;
};

export async function createAlbum({ title, artistId }: { title: string; artistId: string }) {
  return await fetcher
    .post("albums", {
      json: {
        title,
        artist_id: artistId,
      },
    })
    .json<Album>();
}

export async function getAlbum(id: string) {
  return await fetcher.get<Album>(`albums/${id}`).json();
}

export async function createSong(song: {
  title: string;
  albumId: string;
  artistId: string;
  trackOrder: number;
}) {
  return await fetcher
    .post("songs", {
      json: {
        title: song.title,
        album_id: song.albumId,
        artist_id: song.artistId,
        track_order: song.trackOrder,
      },
    })
    .json<{ id: string; upload_url: string }>();
}

export function uploadFile(uploadUrl: string, file: File) {
  return fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "x-ms-blob-type": "BlockBlob",
      "Content-Type": file.type,
      "Content-Length": file.size.toString(),
    },
    body: file,
  });
}

export type Song = {
  id: string;
  title: string;
};

export async function getAlbumSongs(id: string) {
  return await fetcher.get(`albums/${id}/songs`).json<Song[]>();
}

export async function deleteSong(id: string) {
  return await fetcher.delete(`songs/${id}`);
}

export async function getArtistAlbums(id: string) {
  return await fetcher.get(`artists/${id}/albums`).json<Album[]>();
}
