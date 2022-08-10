import "../styles/globals.css";
import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "../components/Layout";
import MyGlobalStyles from "../styles/MyGlobalStyles";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  // instantiate react query client
  const queryClient = new QueryClient();

  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "dark",
            // colorScheme: "light",
            fontFamily: "DM Sans",
            fontSizes: { xs: 12, sm: 14, md: 20, lg: 26, xl: 30 },
          }}
        >
          {/* <MyGlobalStyles /> */}
          <Component {...pageProps} />
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Layout>
  );
}
