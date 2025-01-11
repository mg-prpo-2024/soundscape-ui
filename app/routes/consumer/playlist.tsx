import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Route } from "./+types/playlist";
import * as favorites from "~/services/favorites";
import * as metadata from "~/services/metadata";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { Delete, Heart, Pause, Play } from "lucide-react";
import { usePlayerStore } from "~/lib/playerState";
import { toast } from "sonner";
import { Song } from "~/components/song";

export default function Playlist({ params }: Route.ComponentProps) {
  const { playlistId } = params;

  const mutation = useMutation({
    mutationFn: (songId: string) => favorites.addSongToPlaylist({ playlistId, songId }),
  });

  const result = useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: () => favorites.getPlaylist(playlistId),
  });

  const songIds = result.data?.songs.map((song) => song.id) ?? [];
  const songChecksResult = useQuery({
    queryKey: ["song-checks", ...songIds],
    queryFn: () => favorites.checkSongs(songIds),
  });

  if (result.isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner delay={150} />
      </div>
    );
  }
  const playlist = result.data;
  const songChecks = songChecksResult.data;
  if (!playlist || !songChecks) return null;
  console.log("playlist", playlist);
  return (
    <div>
      <div className="text-sm">Playlist</div>
      <h2 className="text-3xl font-bold">{playlist.name}</h2>
      <div className="mt-5">
        {playlist.songs.map((song, idx) => {
          return (
            <Song
              key={song.id}
              song={song}
              artist="artist name"
              idx={idx}
              showPlaylistDropdown={false}
              actions={<RemoveFromPlaylistButton playlistId={playlistId} songId={song.id} />}
              isLiked={idx < songChecks.length && songChecks[idx]}
            />
          );
        })}
      </div>
    </div>
  );
}

function RemoveFromPlaylistButton({ playlistId, songId }: { playlistId: string; songId: string }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => favorites.removeSongFromPlaylist({ playlistId, songId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlist", playlistId] });
      toast.success("Song removed from playlist");
    },
  });

  const handleRemove = () => {
    mutation.mutate();
  };

  return (
    <Button onClick={handleRemove} size="icon" className="ml-auto rounded-full" variant="ghost">
      <Delete />
    </Button>
  );
}
