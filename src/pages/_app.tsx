import "../styles/globals.css";
import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "../components/Layout";
import MyGlobalStyles from "../styles/MyGlobalStyles";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  // Instantiate react query client
  const queryClient = new QueryClient();

  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          withCSSVariables
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "dark",
            // colorScheme: "light",
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
            // TEST SHADOWS
            shadows: {
              md: "1px 1px 3px rgba(0, 0, 0, .25)",
              xl: "5px 5px 3px rgba(0, 0, 0, .25)",
            },
            loader: "bars",
            fontFamily: "DM Sans",
            fontSizes: { xs: 12, sm: 14, md: 20, lg: 26, xl: 30 },
            components: {
              Button: {
                defaultProps: {
                  variant: "gradient",
                  gradient: {
                    // from: "#ff8b1a",
                    // to: "#e67a00",
                    from: "#e67a00",
                    to: "#b35300",
                    deg: 45,
                  },
                  radius: "md",
                },
                styles: (theme) => ({
                  root: {
                    // backgroundColor: "black",
                    // backgroundColor: theme.colors.orange[5],

                    // variant="gradient"
                    // radius="md"

                    "&:hover": {
                      // backgroundColor: theme.colors.orange[9],
                    },
                  },
                }),
              },
            },
          }}
          // styles={{
          //   Button: (theme) => ({
          //     root: {
          //       backgroundColor: theme.colors.orange[8],
          //     },
          //   }),
          // }}
        >
          <MyGlobalStyles />
          <Component {...pageProps} />
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Layout>
  );
}
