import { Route } from "./+types/playlist";

export default function Playlist({ params }: Route.ComponentProps) {
  const { playlistId } = params;

  return (
    <div>
      <h2 className="text-2xl font-bold">{"Playlist Name"}</h2>
    </div>
  );
}
