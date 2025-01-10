import { useAuth0 } from "@auth0/auth0-react";
import { Link, type MetaFunction } from "react-router";
import { Button } from "~/components/ui/button";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as metadata from "~/services/metadata";
import { Skeleton } from "~/components/ui/skeleton";

export const meta: MetaFunction = () => {
  return [{ title: "SoundScape" }, { name: "description", content: "Music app" }];
};

export default function Home() {
  const yourPlaylists = [
    { id: "1", name: "Favorite Songs", image: "/placeholder.svg?height=150&width=150" },
    { id: "2", name: "Workout Mix", image: "/placeholder.svg?height=150&width=150" },
    { id: "3", name: "Chill Vibes", image: "/placeholder.svg?height=150&width=150" },
    { id: "4", name: "Party Anthems", image: "/placeholder.svg?height=150&width=150" },
    { id: "5", name: "Road Trip", image: "/placeholder.svg?height=150&width=150" },
    { id: "6", name: "90s Nostalgia", image: "/placeholder.svg?height=150&width=150" },
    { id: "7", name: "Study Session", image: "/placeholder.svg?height=150&width=150" },
    { id: "8", name: "Acoustic Covers", image: "/placeholder.svg?height=150&width=150" },
  ];

  const popularArtists = [
    { id: "1", name: "Drake", image: "/placeholder.svg?height=150&width=150" },
    { id: "2", name: "Ariana Grande", image: "/placeholder.svg?height=150&width=150" },
    { id: "3", name: "Ed Sheeran", image: "/placeholder.svg?height=150&width=150" },
    { id: "4", name: "Taylor Swift", image: "/placeholder.svg?height=150&width=150" },
    { id: "5", name: "The Weeknd", image: "/placeholder.svg?height=150&width=150" },
    { id: "6", name: "Billie Eilish", image: "/placeholder.svg?height=150&width=150" },
    { id: "7", name: "Post Malone", image: "/placeholder.svg?height=150&width=150" },
    { id: "8", name: "Dua Lipa", image: "/placeholder.svg?height=150&width=150" },
  ];
  const result = useQuery({
    queryKey: [],
    queryFn: () => metadata.getAlbums(),
  });
  const albums =
    result.data?.map((album) => ({
      id: album.id,
      name: album.title,
      image: "",
      artist: album.artist.name,
      link: `/album/${album.id}`,
    })) ?? [];
  return (
    <main className="flex-1 space-y-8">
      <Carousel title="Popular Albums" items={albums} isLoading={result.isLoading} />
      <Carousel title="Your Playlists" items={yourPlaylists} />
      <Carousel title="Popular Artists" items={popularArtists} />
    </main>
  );
}

type Item = {
  id: string;
  name: string;
  image: string;
  artist?: string;
  link?: string;
};

function Carousel({
  title,
  items,
  isLoading = false,
}: {
  title: string;
  items: Item[];
  isLoading?: boolean;
}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const itemWidth = 208; // 200px width + 8px margin
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -itemWidth : itemWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scroll("left")}
            disabled={scrollPosition <= 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scroll("right")}
            disabled={
              scrollPosition >= items.length * itemWidth - containerRef.current?.clientWidth!
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div
          ref={containerRef}
          className="flex w-max space-x-4 p-1"
          onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
        >
          {isLoading ? (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-[240px] w-[200px] bg-[#181818]" />
              ))}
            </>
          ) : (
            items.map((item) => (
              <Link key={item.id} to={item.link ?? "/"}>
                <div className="w-[200px] shrink-0">
                  <div className="group relative rounded-lg bg-[#181818] p-4 transition-colors hover:bg-[#282828]">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="mb-4 rounded-md"
                    />
                    <h3 className="truncate font-semibold">{item.name}</h3>
                    {item.artist && <p className="truncate text-sm text-gray-400">{item.artist}</p>}
                    <Button
                      size="icon"
                      className="absolute bottom-4 right-4 mt-2 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
