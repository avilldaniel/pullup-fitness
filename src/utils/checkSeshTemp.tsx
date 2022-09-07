import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const NameOfPage: NextPage = () => {
  // Session
  const { data } = useSession();

  // useRouter()
  const router = useRouter();

  // If user is not authenticated, re-direct
  if (!data?.user?.email) {
    router.push("/u");
  }

  // Else, user is authenticated
  return (
    <div>
      <>Sesh is good</>
    </div>
  );
};

export default NameOfPage;
