import { useQuery } from "@tanstack/react-query";
import type { Route } from "./+types/album";
import * as metadata from "~/services/metadata";
import { Spinner } from "~/components/ui/spinner";
import placeholder from "~/assets/placeholder.svg";
import { Link } from "react-router";
import { Heart, Play } from "lucide-react";
import { Button } from "~/components/ui/button";
import { HeartFilledIcon } from "@radix-ui/react-icons";

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

  if (albumResult.isLoading || songsResult.isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner delay={150} />
      </div>
    );
  }
  const album = albumResult.data;
  const songs = songsResult.data;
  if (!album || !songs) return null;
  console.log(albumResult.data);

  return (
    <section className="min-h-screen p-6">
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
            <div
              key={song.id}
              className="flex items-center gap-3 rounded-md px-5 py-2 hover:bg-gray-900"
            >
              <div className="w-4 text-gray-400">{idx + 1}</div>
              <div className="flex flex-col">
                <h2 className="font-normal">{song.title}</h2>
                <span className="text-xs text-gray-400">{album.artist.name}</span>
              </div>
              <Button size="icon" className="ml-auto rounded-full" variant="ghost">
                <Heart />
                {/* TODO: <HeartFilledIcon /> */}
              </Button>
              <Button size="icon" className="rounded-full">
                <Play />
                {/* TODO: <HeartFilledIcon /> */}
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
