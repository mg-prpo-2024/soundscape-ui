import type { Route } from "./+types/artist";

export default function Artist({ params }: Route.ComponentProps) {
  const { artistId } = params;

  return (
    <section>
      <h1>Artist: {artistId}</h1>
    </section>
  );
}
