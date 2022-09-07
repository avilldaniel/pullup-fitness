import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import NoAuth from "../components/NoAuth";

const NameOfPage: NextPage = () => {
  // Session
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <>Sesh is good</>
      </div>
    );
  }

  return <NoAuth />;
};

export default NameOfPage;
