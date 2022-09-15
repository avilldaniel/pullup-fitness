import type { FC } from "react";
import Meta from "./Meta";
import { defaultProps } from "./Meta";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Meta {...defaultProps} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
