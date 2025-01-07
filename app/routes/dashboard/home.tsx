import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Spinner } from "~/components/ui/spinner";
import { Textarea } from "~/components/ui/textarea";
import { useArtist } from "~/hooks/use-artist";
import * as upload from "~/services/upload";

export default function DashboardHome() {
  const result = useArtist();

  console.log(result);

  if (result.isLoading) {
    return <Spinner />;
  }
  if (!result.data) {
    return null;
  }

  return (
    <section>
      <h1 className="text-3xl font-bold">{result.data.name}</h1>
      <div className="mt-6">
        {/* TODO: display image */}
        <div className="grid w-full gap-1.5">
          <h2 className="font-bold">Your Bio</h2>
          <Textarea value={result.data.bio} placeholder="Bio" id="message" />
        </div>
        <Separator className="my-4" />
        <div>
          <div className="flex justify-between">
            <h2 className="font-bold">Your Albums</h2>
            <Button asChild>
              <Link to="/dashboard/albums/new" className="flex items-center">
                <Plus />
                Create a New Album
              </Link>
            </Button>
          </div>
          <div className="p-2">
            <Albums />
          </div>
        </div>
      </div>
    </section>
  );
}

function Albums() {
  // const result = useQuery({
  //   queryKey: ["artist", user?.sub],
  //   queryFn: (ctx) => upload.getArtist(ctx.queryKey[1]),
  //   throwOnError: true,
  // });
  const albums = ["Dawn"];
  return (
    <div>
      {albums.map((album) => {
        return (
          <div key={album} className="grid gap-1.5">
            <div>{album}</div>
          </div>
        );
      })}
    </div>
  );
}
