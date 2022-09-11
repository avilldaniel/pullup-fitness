import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import OrangeLoader from "../components/OrangeLoader";

const NameOfPage: NextPage = () => {
  // Session
  const { status } = useSession();

  // Loading
  if (status === "loading") {
    return <OrangeLoader />;
  }

  // Authenticated
  else if (status === "authenticated") {
    return (
      <div>
        <>Sesh is good</>
      </div>
    );
  }

  // Not authenticated
  return (
    <div>
      You must be signed in to access this page.
      <Link href="/signin" aria-label="Sign-in link">
        Go to sign-in
      </Link>
    </div>
  );
};

export default NameOfPage;
