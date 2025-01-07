import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import * as upload from "~/services/upload";

export function useArtist() {
  const { user } = useAuth0();
  return useQuery({
    queryKey: ["artist", user?.sub],
    queryFn: () => (user?.sub ? upload.getArtist(user.sub) : Promise.resolve(null)),
    // throwOnError: true,
  });
}
