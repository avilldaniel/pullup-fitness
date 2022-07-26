import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";

// eventually, make it so that if the person visiting a user's
// page is the actual authenticated user, it will display their dashboard
// else, it will just show the requested user's public profile
// which will include their stats/workouts/etc.
/***********************************************/
// the SSR fetch will depend on who is the auth user
/***********************************************/
// in the future, we'll implement being able to set
// a user's profile to private or public

const Username: NextPage = (context) => {
  console.log("context:", context);
  const router = useRouter();
  const { username } = router.query;

  return (
    <>
      <div>Username: {username}</div>
    </>
  );
};

export default Username;

// SSR here, which will fetch data that would be most
// relevant for a user to want to see on their dashboard
// need to use getStaticPaths since it's a dynamic route
// OR, research useSwr to see if client-side data fetching
// would be more optimal for this
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // fetch
  // const res = await axios.get()
  // const { username } = ctx;
  console.log("ctx:", ctx);

  return {
    props: {
      exercises: [],
      exerciseStats: [],
    },
  };
};
