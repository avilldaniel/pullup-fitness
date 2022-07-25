import { NextPage } from "next";
import { useRouter } from "next/router";

const Username: NextPage = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <>
      <div>Username: {username}</div>
    </>
  );
};

export default Username;
