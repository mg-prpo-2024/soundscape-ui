import { config } from "~/config";
import { baseFetcher } from "~/services/base";
import * as metadata from "~/services/metadata";

const fetcher = baseFetcher.extend({ prefixUrl: config.services.endpoints.favorites });

export async function createPlaylist({ name }: { name: string }) {
  return await fetcher.post("playlists", {
    json: { name },
  });
}

type Playlist = {
  id: string;
  name: string;
  total_songs: number;
};

export async function getPlaylists() {
  return await fetcher.get("playlists").json<Playlist[]>();
}

type PlaylistFull = {
  id: string;
  name: string;
  songs: metadata.SongFull[];
};

export async function getPlaylist(playlistId: string) {
  return await fetcher.get(`playlists/${playlistId}`).json<PlaylistFull>();
}

export async function addSongToPlaylist({
  playlistId,
  songId,
}: {
  playlistId: string;
  songId: string;
}) {
  return await fetcher.post(`playlists/${playlistId}/songs`, {
    json: { song_id: songId },
  });
}

export async function removeSongFromPlaylist({
  playlistId,
  songId,
}: {
  playlistId: string;
  songId: string;
}) {
  return await fetcher.delete(`playlists/${playlistId}/songs/${songId}`, {});
}
