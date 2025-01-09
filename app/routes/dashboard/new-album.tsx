import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Spinner } from "~/components/ui/spinner";
import { useArtist } from "~/hooks/use-artist";
import * as upload from "~/services/upload";

export default function NewAlbum() {
  const artist = useArtist();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: upload.createAlbum,
    onSuccess: (result) => {
      console.log(result);
      toast.success("Successfully created!");
      navigate("/dashboard/album/" + result.id);
      // TODO: populate cache with response
    },
    onError: (error) => {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    },
  });

  if (artist.isLoading) {
    return <Spinner />;
  }

  const handleCreateAlbum = () => {
    if (!artist.data) {
      return null;
    }
    mutation.mutate({ title, artistId: artist.data.id });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">New Album</h1>
      <div className="h-8" />
      <Input onChange={(e) => setTitle(e.target.value)} placeholder="Album Name" />
      <div className="h-2" />
      <Button onClick={handleCreateAlbum}>Create</Button>
      {/* TODO: album cover */}
    </div>
  );
}
