import { useQuery } from "@tanstack/react-query";
import { Music, Plus, PlusCircle } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Spinner } from "~/components/ui/spinner";
import { useArtist } from "~/hooks/use-artist";
import placeholder from "~/assets/placeholder.svg";
import * as upload from "~/services/upload";

export default function DashboardHome() {
  const result = useArtist();

  if (result.isLoading) {
    return <Spinner />;
  }
  if (!result.data) {
    return null;
  }
  const artist = result.data;

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <img
              src={placeholder} // TODO: replace with artist avatar
              alt={artist.name}
              width={300}
              height={300}
              className="rounded-full"
            />
            <div>
              <CardTitle className="mb-2 text-3xl">{artist.name}</CardTitle>
              <CardDescription>{artist.bio}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Albums</h2>
        <Button asChild>
          <Link to="/dashboard/album/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Album
          </Link>
        </Button>
      </div>

      <AlbumGrid artistId={artist.id} />
    </div>
  );
}

// Placeholder data (in a real app, this would come from an API or database)
const albums = [
  { id: 1, name: "Born to Die", year: 2012, image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Ultraviolence", year: 2014, image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Honeymoon", year: 2015, image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Lust for Life", year: 2017, image: "/placeholder.svg?height=200&width=200" },
  {
    id: 5,
    name: "Norman Fucking Rockwell!",
    year: 2019,
    image: "/placeholder.svg?height=200&width=200",
  },
];

function AlbumGrid({ artistId }: { artistId: string }) {
  const result = useQuery({
    queryKey: ["arist-albums", artistId],
    queryFn: () => upload.getArtistAlbums(artistId),
  });

  if (result.isLoading) {
    return <Spinner />;
  }

  const albums = result.data;

  if (!albums) {
    return null;
  }

  if (albums.length === 0) {
    return <AlbumsEmptyState />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {albums.map((album) => (
        <Link to={`/dashboard/album/${album.id}`} key={album.id}>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={placeholder} // TODO: {album.image}
                alt={album.title}
                width={200}
                height={200}
                className="h-auto w-full object-cover"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <h2 className="w-full truncate text-xl font-semibold">{album.title}</h2>
              <p className="text-sm text-muted-foreground">
                {new Date(album.created_at).getFullYear()}
              </p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function AlbumsEmptyState() {
  return (
    <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-muted p-6 text-center">
      <Music className="mb-4 h-16 w-16 text-muted-foreground" />
      <h3 className="mb-2 text-2xl font-semibold">No Albums Yet</h3>
      <p className="mb-4 text-muted-foreground">
        Your discography is waiting to be filled with your amazing music.
      </p>
      <p className="text-sm text-muted-foreground">
        Click the "Create New Album" button above to get started.
      </p>
    </div>
  );
}
