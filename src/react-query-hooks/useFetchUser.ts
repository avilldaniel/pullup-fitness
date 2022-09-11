// React-Query hook to fetch authenticated user's username

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useFetchUser = () => {
  const { data: session } = useSession();
  return useQuery(["username", session?.user?.email], async () => {
    const res = await fetch(
      `/api/user/username?emailInput=${session?.user?.email}`
    );
    const username = await res.json();

    return username;
  });
};

export default useFetchUser;
