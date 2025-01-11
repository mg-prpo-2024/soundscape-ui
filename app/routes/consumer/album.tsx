import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import placeholder from "~/assets/placeholder.svg";
import { Spinner } from "~/components/ui/spinner";
import * as favorites from "~/services/favorites";
import * as metadata from "~/services/metadata";
import type { Route } from "./+types/album";
import { Song } from "~/components/song";

export default function Album({ params }: Route.ComponentProps) {
  const { albumId } = params;

  const albumResult = useQuery({
    queryKey: ["album", albumId],
    queryFn: () => metadata.getAlbum(albumId),
  });

  const songsResult = useQuery({
    queryKey: ["songs", albumId],
    queryFn: () => metadata.getAlbumSongs(albumId),
  });

  const songIds = songsResult.data?.map((song) => song.id) ?? [];
  const songChecksResult = useQuery({
    queryKey: ["song-checks", ...songIds],
    queryFn: () => favorites.checkSongs(songIds),
  });

  if (albumResult.isLoading || songsResult.isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner delay={150} />
      </div>
    );
  }
  const album = albumResult.data;
  const songs = songsResult.data;
  const songChecks = songChecksResult.data;
  if (!album || !songs || !songChecks) return null;
  console.log("song checks", songChecksResult.data);

  return (
    <section className="min-h-screen">
      <div className="mb-8 flex flex-col items-end gap-6 md:flex-row md:items-center">
        <img
          src={placeholder}
          alt={`${album.title} cover`}
          width={140}
          height={140}
          className="h-[140px] w-[140px] rounded-lg object-cover shadow-lg"
        />
        <div>
          <h1 className="mb-2 text-5xl font-bold">{album.title}</h1>
          <p className="text-sm text-gray-400">
            <Link to={`/artist/${album.artist.id}`} className="mb-1 font-bold hover:underline">
              {album.artist.name}
            </Link>
            &nbsp;• {new Date(album.created_at).getFullYear()} • {10} songs
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {songs.map((song, idx) => {
          return (
            <Song
              key={song.id}
              song={song}
              idx={idx}
              artist={album.artist.name}
              isLiked={songChecks.length > idx && songChecks[idx]}
            />
          );
        })}
      </div>
    </section>
  );
}
