import { Route } from "./+types/liked-songs";

export default function Playlist({ params }: Route.ComponentProps) {
  // const { playlistId } = params;

  return (
    <div>
      <h2 className="text-2xl font-bold">{"Liked Songs"}</h2>
    </div>
  );
}
