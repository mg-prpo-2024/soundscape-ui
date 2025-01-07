import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import * as upload from "~/services/upload";

// TODO: implement image uploads

export default function Create() {
  const { user } = useAuth0();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: upload.createArtist,
    onSuccess: (result) => {
      console.log(result);
      toast.success("Successfully created!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    },
    onError: (error) => {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    },
  });
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const handleCreate = () => {
    const userId = user?.sub;
    if (!userId) return;
    mutation.mutate({ name, bio, userId });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Become an Artist</h1>
      <div className="h-8" />
      <div className="flex flex-col gap-2">
        <Input onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
        <Textarea onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself" />
        <Button
          className=""
          disabled={name.length === 0 || mutation.isPending}
          onClick={handleCreate}
        >
          {mutation.isPending ? "loading" : "Create"}
        </Button>
      </div>
    </div>
  );
}
