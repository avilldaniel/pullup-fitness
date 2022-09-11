import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import OrangeLoader from "../../components/OrangeLoader";
import Stats from "../../components/Stats";

const StatsPage: NextPage = () => {
  // Session
  const { status, data: session } = useSession();

  // Loading
  if (status === "loading") {
    return <OrangeLoader />;
  }

  // Authenticated
  else if (status === "authenticated") {
    return (
      <div className="stats_page">
        <Stats email={session.user?.email} />
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

export default StatsPage;
