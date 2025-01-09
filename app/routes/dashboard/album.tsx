import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Music, MusicIcon } from "lucide-react";
import type { Route } from "./+types/album";
import { UploadIcon } from "lucide-react";
import * as upload from "~/services/upload";
import { Spinner } from "~/components/ui/spinner";
import { useRef, useState } from "react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useArtist } from "~/hooks/use-artist";
import { toast } from "sonner";

export default function Album({ params }: Route.ComponentProps) {
  const albumId = params.albumId;
  const artistResult = useArtist();
  const albumResult = useQuery({
    queryKey: ["album", albumId],
    queryFn: () => upload.getAlbum(albumId),
  });

  if (albumResult.isLoading || artistResult.isLoading) {
    return <Spinner />;
  }

  if (!albumResult.data || !artistResult.data) {
    return null;
  }
  const artistId = artistResult.data.id;

  return (
    <section>
      <AlbumHeader albumName={albumResult.data.title} />
      <div className="h-6" />
      <SongForm albumId={albumResult.data.id} artistId={artistId} />
      <div className="h-8" />
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Songs</h2>
        <SongList artist={artistResult.data} albumId={albumResult.data.id} />
      </div>
    </section>
  );
}

function AlbumHeader({ albumName }: { albumName: string }) {
  return (
    <div className="mb-6 flex items-center space-x-4">
      <div className="rounded-lg bg-primary p-4 text-primary-foreground">
        <MusicIcon size={48} />
      </div>
      <div>
        {/* <Badge className="mb-1 text-xs">Album</Badge> */}
        <h1 className="text-3xl font-bold">{albumName}</h1>
        <p className="text-muted-foreground">Manage your album songs</p>
      </div>
    </div>
  );
}

type SongFormData = {
  title: string;
  file: File | null;
};

function SongForm({ albumId, artistId }: { albumId: string; artistId: string }) {
  const [formData, setFormData] = useState<SongFormData>({
    title: "",
    file: null,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: upload.createSong,
    onSuccess: (result) => {
      return upload.uploadFile(result.upload_url, formData.file as File).then(() => {
        toast.success("Song uploaded successfully!");
        queryClient.invalidateQueries({ queryKey: ["songs", albumId] });
        setFormData({ title: "", file: null });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "file" && files) {
      setFormData((prev) => {
        return { title: prev.title || files[0].name, [name]: files[0] };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting song:", formData);
    mutation.mutate({ title: formData.title, albumId, artistId, trackOrder: 1 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Song Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="file">Song File</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="file"
            name="file"
            type="file"
            onChange={handleChange}
            ref={fileInputRef}
            accept="audio/*"
            className="flex-grow"
            required
          />
          <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
            <UploadIcon className="mr-2 h-4 w-4" /> Upload
          </Button>
        </div>
      </div>
      <Button type="submit" disabled={mutation.isPending} className="min-w-28">
        {mutation.isPending ? <Loader2 className="animate-spin" /> : "Add Song"}
      </Button>
    </form>
  );
}

function SongList({ albumId, artist }: { albumId: string; artist: upload.Artist }) {
  const result = useQuery({
    queryKey: ["songs", albumId],
    queryFn: () => upload.getAlbumSongs(albumId),
  });

  if (result.isLoading) {
    return <Spinner />;
  }

  if (!result.data) {
    return null;
  }

  const songs = result.data;
  if (songs.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <Music className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No songs in this album</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Get started by adding a new song to your album.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          {/* <TableHead>Duration</TableHead> */}
          {/* <TableHead>File Name</TableHead> */}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {songs.map((song) => (
          <TableRow key={song.id}>
            <TableCell>{song.title}</TableCell>
            <TableCell>{artist.name}</TableCell>
            {/* <TableCell>{song.duration}</TableCell> */}
            {/* <TableCell>{song.fileName}</TableCell> */}
            <TableCell align="right">
              <Button variant="outline" size={"sm"} className="mr-2">
                Edit
              </Button>
              <DeleteSongButton id={String(song.id)} albumId={albumId} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function DeleteSongButton({ id, albumId }: { id: string; albumId: string }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: upload.deleteSong,
    onSuccess() {
      console.log("invalidating", ["songs", albumId]);
      queryClient.invalidateQueries({ queryKey: ["songs", albumId] });
    },
    onError(error) {
      toast.error("An error occurred. Please try again later.");
    },
  });
  const handleDelete = () => {
    mutation.mutate(id);
  };
  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      {mutation.isPending ? <Loader2 className="animate-spin" /> : "Delete"}
    </Button>
  );
}
