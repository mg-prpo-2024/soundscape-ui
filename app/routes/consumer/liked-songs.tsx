import { useQuery } from "@tanstack/react-query";
import { Route } from "./+types/liked-songs";
import * as favorites from "~/services/favorites";
import { Song } from "~/components/song";

export default function Playlist({}: Route.ComponentProps) {
  const result = useQuery({
    queryKey: ["liked-songs"],
    queryFn: () => favorites.getLikedSongs(),
  });

  return (
    <div>
      <h2 className="text-2xl font-bold">{"Liked Songs"}</h2>
      <div className="mt-3">
        {result.isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {result.data?.map((song, idx) => (
              <Song key={song.id} song={song} idx={idx} artist={"artist name"} isLiked />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
