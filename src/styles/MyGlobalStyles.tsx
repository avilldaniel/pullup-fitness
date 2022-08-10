import { Global } from "@mantine/core";

const MyGlobalStyles = () => {
  return (
    <Global
      styles={(theme) => ({
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },

        // html, body: {
        "html, body": {
          padding: 0,
          margin: 0,
          fontSize: "1.25rem",
        },

        //   'html, body':  {
        //   padding: 0;
        //   margin: 0;
        //   font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        //     Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        //   /* font-family: "Ubuntu", sans-serif; */
        // }

        // a {
        //   color: inherit;
        //   text-decoration: none;
        // }
      })}
    />
  );
};

export default MyGlobalStyles;
