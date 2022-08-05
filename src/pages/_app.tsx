import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Layout from "../components/Layout";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <Layout>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          // colorScheme: "dark",
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </Layout>
  );
}
