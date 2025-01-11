import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import * as favorites from "~/services/favorites";
import placeholder from "~/assets/placeholder.svg";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

export default function Playlists() {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: favorites.createPlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      toast.success("Playlist created");
    },
    onError: () => {
      toast.error("Failed to create playlist");
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold">{"Your Playlists"}</h2>
      <div className="mt-6 flex gap-2">
        <Input onChange={(e) => setName(e.target.value)} value={name} />
        <Button onClick={() => mutation.mutate({ name })} disabled={mutation.isPending}>
          Create Playlist
        </Button>
      </div>
      <div className="mt-3">
        <PlaylistList />
      </div>
    </div>
  );
}

function PlaylistList() {
  const result = useQuery({
    queryKey: ["playlists"],
    queryFn: () => favorites.getPlaylists(),
  });
  console.log("playlists", result.data);

  if (result.isLoading) {
    return <div>Loading...</div>;
  }
  const playlists = result.data ?? [];

  return (
    <div>
      {playlists.map((playlist) => (
        <Link to={`/playlist/${playlist.id}`} className="block" key={playlist.id}>
          <div className="flex items-center gap-6 rounded px-5 py-4 hover:bg-gray-900">
            <img src={placeholder} alt={playlist.name} className="h-12 w-12 rounded object-cover" />
            <span className="font-medium">{playlist.name}</span>
            <span className="text-sm">{playlist.total_songs} songs</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
