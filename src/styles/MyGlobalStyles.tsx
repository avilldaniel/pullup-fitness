import { Global } from "@mantine/core";

const MyGlobalStyles = () => {
  return (
    <Global
      styles={(theme) => ({
        "*, *::before, *::after": {
          padding: 0,
          margin: 0,
          boxSizing: "border-box",
        },

        a: {
          color: "inherit",
          textDecoration: "none",
        },
      })}
    />
  );
};

export default MyGlobalStyles;
