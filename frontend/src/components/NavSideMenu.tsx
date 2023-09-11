import { useState } from "react";
import Link from "next/link";
import { signOut, signIn } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavSideMenu = () => {
  const [open, setOpen] = useState(false);
  const onLogout = () => {
    signOut();
    signIn();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="fixed top-6 left-6 w-[23px] xl:left-20 xl:top-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/navIcon.svg"
            className=" max-w-full"
            alt="Menu Icon"
          />
        </button>
      </SheetTrigger>
      <SheetContent position={"left"} size={"content"}>
        <SheetHeader></SheetHeader>

        <nav>
          <h3 className="text-xl border-b mb-7 pb-1">Menu</h3>
          <ul>
            <Link
              onClick={() => setOpen(false)}
              href="/"
              className="block mb-3"
            >
              Transactions
            </Link>
            <Link
              onClick={() => setOpen(false)}
              href="/analysis"
              className="block mb-3"
            >
              Analysis
            </Link>
            <Link
              onClick={() => setOpen(false)}
              href="/profile"
              className="block mb-3"
            >
              Profile
            </Link>
            <Link onClick={onLogout} href="/" className="block">
              Logout
            </Link>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default NavSideMenu;
