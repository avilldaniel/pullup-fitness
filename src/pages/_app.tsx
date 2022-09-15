import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "../components/main/Layout";
import { MantineProvider } from "@mantine/core";
import "../styles/globals.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const { session } = pageProps;

  // Instantiate react query client
  const queryClient = new QueryClient();

  return (
    <Layout>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            withCSSVariables
            theme={{
              colorScheme: "dark",
              respectReducedMotion: true,
              colors: {
                cyan: [
                  "#e0f7ff",
                  "#b5e5fd",
                  "#88d3fa",
                  "#5bc1f6",
                  "#39aff4",
                  "#2a96da",
                  "#1d75aa",
                  "#11547a",
                  "#02324a",
                  "#00121c",
                ],
                rose: [
                  "#ffe6eb",
                  "#fabac4",
                  "#f08ea0",
                  "#e9627f",
                  "#e23860",
                  "#c81e4c",
                  "#9d163f",
                  "#710e26",
                  "#450512",
                  "#1d0004",
                ],
                orange: [
                  "#ffecda",
                  "#ffd0ae",
                  "#ffb67d",
                  "#ff9f4c",
                  "#ff8b1a",
                  "#e67a00",
                  "#b35300",
                  "#813200",
                  "#4f1800",
                  "#1f0400",
                ],
                gray: [
                  "#f2f2f2",
                  "#d9d9d9",
                  "#bfbfbf",
                  "#a6a6a6",
                  "#8c8c8c",
                  "#737373",
                  "#595959",
                  "#404040",
                  "#262626",
                  "#0d0d0d",
                ],

                // kinda light blue
                // dark: [
                //   "#F2F8FA",
                //   "#F2F8FA",
                //   "#BFDEEC",
                //   "#8ECAE6",
                //   "#69B1D3",
                //   "#4D9BBF",
                //   "#4483A1",
                //   "#3F6D83",
                //   "#3A5C6B",
                //   "#344D58",
                // ],

                // matUI Blue Grey
                dark: [
                  "#ECEFF1",
                  "#CFD8DC",
                  "#B0BEC5",
                  "#90A4AE",
                  "#69B1D3",
                  "#607D8B",
                  "#546E7A",
                  "#455A64",
                  "#37474F",
                  "#263238",
                ],
              },
              defaultGradient: { deg: 45, from: "#ff8b1a", to: "#e67a00" },
              loader: "bars",
              fontFamily: "DM Sans",
              fontSizes: { xs: 12, sm: 14, md: 20, lg: 26, xl: 30 },
              components: {
                // Button: {
                //   defaultProps: {
                //     variant: "gradient",
                //     gradient: {
                //       // from: "#ff8b1a",
                //       // to: "#e67a00",
                //       from: "#e67a00",
                //       to: "#b35300",
                //       deg: 45,
                //     },
                //     radius: "md",
                //   },
                //   styles: (theme) => ({
                //     root: {
                //       padding: 0,
                //       fontSize: theme.fontSizes.sm,
                //       width: "100%",
                //     },
                //     input: {
                //       // fontSize: "2em",
                //       // margin: 0,
                //     },
                //   }),
                // },
              },
            }}
          >
            <Component {...pageProps} />
          </MantineProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  );
}
