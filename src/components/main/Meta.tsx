import Head from "next/head";
import type { FC } from "react";

export interface IMetaProps {
  keywords: string;
  description: string;
  title: string;
}

// const Meta = ({ keywords, description, title }: IMetaProps) => {
const Meta: FC<IMetaProps> = ({ keywords, description, title }) => {
  return (
    <Head>
      {/* This tag ensures that <Select /> does not zoom in on mobile */}
      <meta
        name="viewport"
        content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />

      {/* For mobile compatibility? */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export const defaultProps = (Meta.defaultProps = {
  keywords: "Exercise, Fitness, Gym, Health, Tracher, Workout, Muscle",
  description: "Health is wealth.",
  title: "PulluP Fitness",
});

export default Meta;
