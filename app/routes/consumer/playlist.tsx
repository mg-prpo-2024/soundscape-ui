import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Route } from "./+types/playlist";
import * as favorites from "~/services/favorites";
import * as metadata from "~/services/metadata";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { Delete, Heart, Pause, Play } from "lucide-react";
import { usePlayerStore } from "~/lib/playerState";
import { toast } from "sonner";

export default function Playlist({ params }: Route.ComponentProps) {
  const { playlistId } = params;

  const mutation = useMutation({
    mutationFn: (songId: string) => favorites.addSongToPlaylist({ playlistId, songId }),
  });

  const result = useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: () => favorites.getPlaylist(playlistId),
  });

  if (result.isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner delay={150} />
      </div>
    );
  }
  const playlist = result.data;
  if (!playlist) return null;
  console.log("playlist", playlist);
  return (
    <div>
      <div className="text-sm">Playlist</div>
      <h2 className="text-3xl font-bold">{playlist.name}</h2>
      <div className="mt-5">
        {playlist.songs.map((song, idx) => {
          return <Song key={song.id} song={song} playlistId={playlist.id} idx={idx} />;
        })}
      </div>
    </div>
  );
}

function Song({
  song,
  playlistId,
  idx,
}: {
  song: metadata.SongFull;
  playlistId: string;
  idx: number;
}) {
  const store = usePlayerStore();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => favorites.removeSongFromPlaylist({ playlistId, songId: song.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlist", playlistId] });
      toast.success("Song removed from playlist");
    },
  });

  const handleToggle = () => {
    if (!store.isPlaying || (store.isPlaying && store.audio?.id !== song.id)) {
      store.playAudio({ id: song.id, title: song.title });
    } else {
      store.toggle();
    }
  };

  const handleRemove = () => {
    mutation.mutate();
  };

  return (
    <div className="flex items-center gap-3 rounded-md px-5 py-2 hover:bg-gray-900">
      <div className="w-4 text-gray-400">{idx + 1}</div>
      <div className="flex flex-col">
        <h2 className="font-normal">{song.title}</h2>
        {/* <span className="text-xs text-gray-400">{album.artist.name}</span> */}
      </div>

      <Button onClick={handleRemove} size="icon" className="ml-auto rounded-full" variant="ghost">
        <Delete />
      </Button>
      <Button size="icon" className="rounded-full" variant="ghost">
        <Heart />
        {/* TODO: <HeartFilledIcon /> */}
      </Button>
      <Button onClick={handleToggle} size="icon" className="rounded-full">
        {store.isPlaying && store.audio?.id === song.id ? <Pause /> : <Play />}
      </Button>
    </div>
  );
}
