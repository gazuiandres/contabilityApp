import { useSession } from "next-auth/react"

type MainLayoutProps = {
  children: React.ReactElement;
};

import NavSideMenu from "@/components/NavSideMenu";
import NavMobile from "@/components/NavMobile";

const MainLayout = ({ children }: MainLayoutProps) => {
  const {status} = useSession()
  const authenticated = status === "authenticated"
  const loading = status === "loading"
  return (
    <>
      {/* Menu nav */}
      {!loading && authenticated && <NavMobile />}

      {/* Open Side Menu */}
      {!loading && authenticated && <NavSideMenu />}


      {children}
    </>
  );
};

export default MainLayout;
