import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";

interface Props {
  children: ReactNode;
  status: boolean;
  clicked: any;
  secondClick: any;
}
const Layout: FC<Props> = ({ children, status, clicked, secondClick }) => {
  const handleDialog = () => {
    clicked();
  };
  const handleDialog2 = () => {
    secondClick();
  };
  return (
    <>
      <div className="overflow-hidden flex flex-col min-h-screen">
        <Head>
          <title>Educert</title>
        </Head>
        <Header status={status} dialog={handleDialog} dialog2={handleDialog2} />
        <div className="py-16 max-w-7xl mx-auto space-y-8 sm:px-6 lg:px-8">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
