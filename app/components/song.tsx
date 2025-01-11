import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as favorites from "~/services/favorites";
import { usePlayerStore } from "~/lib/playerState";
import { Button } from "~/components/ui/button";
import { Heart, Pause, Play, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Spinner } from "~/components/ui/spinner";
import { HeartFilledIcon } from "@radix-ui/react-icons";

export function Song({
  song,
  idx,
  artist,
  showPlaylistDropdown = true,
  actions,
  isLiked = false,
}: {
  song: { id: string; title: string };
  idx: number;
  artist: string;
  showPlaylistDropdown?: boolean;
  actions?: React.ReactNode;
  isLiked?: boolean;
}) {
  const store = usePlayerStore();

  const handleToggle = () => {
    if (!store.isPlaying || (store.isPlaying && store.audio?.id !== song.id)) {
      store.playAudio({ id: song.id, title: song.title });
    } else {
      store.toggle();
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-md px-5 py-2 hover:bg-gray-900">
      <div className="w-4 text-gray-400">{idx + 1}</div>
      <div className="flex flex-col">
        <h2 className="font-normal">{song.title}</h2>
        <span className="text-xs text-gray-400">{artist}</span>
      </div>
      <div className="ml-auto flex gap-2">
        {actions}
        {showPlaylistDropdown && <PlaylistDropdown songId={song.id} className="ml-auto" />}
        <LikeButton songId={song.id} isLiked={isLiked} />
        <Button onClick={handleToggle} size="icon" className="rounded-full">
          {store.isPlaying && store.audio?.id === song.id ? <Pause /> : <Play />}
        </Button>
      </div>
    </div>
  );
}

function PlaylistDropdown({ songId }: { songId: string; className?: string }) {
  const result = useQuery({
    queryKey: ["playlists"],
    queryFn: () => favorites.getPlaylists(),
  });
  const mutation = useMutation({
    mutationFn: (playlistId: string) => favorites.addSongToPlaylist({ playlistId, songId }),
    onSuccess: () => {
      toast.success("Song added to playlist");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Unexpected error");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="ml-auto rounded-full" variant="ghost">
          <PlusCircle />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="left">
        <DropdownMenuLabel>Your Playlists</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {result.isLoading ? (
          <Spinner />
        ) : (
          result.data?.map((playlist) => {
            return (
              <DropdownMenuItem onSelect={() => mutation.mutate(playlist.id)}>
                {playlist.name}
              </DropdownMenuItem>
            );
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LikeButton({ songId, isLiked }: { songId: string; isLiked: boolean }) {
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: () => favorites.likeSong(songId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["song-checks"] });
    },
  });
  const unlikeMutation = useMutation({
    mutationFn: () => favorites.unlikeSong(songId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["song-checks"] });
      queryClient.invalidateQueries({ queryKey: ["liked-songs"] });
    },
  });

  const handleClick = () => {
    if (isLiked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  return (
    <Button
      size="icon"
      className="rounded-full"
      variant="ghost"
      onClick={handleClick}
      disabled={likeMutation.isPending || unlikeMutation.isPending}
    >
      {isLiked ? <HeartFilledIcon /> : <Heart />}
    </Button>
  );
}
