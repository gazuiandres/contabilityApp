import Link from "next/link";
import Image from "next/image";
const NavMobile = () => {
  return (
    <nav className="text-white h-[3.8125rem] w-full bg-mainBlue fixed bottom-0 xl:hidden">
      <ul className="flex w-full h-full justify-around items-center">
        <Link href="/" className="flex flex-col items-center">
          <Image
            src="/icons/transactionsIcon.svg"
            className="mb-1"
            width={16}
            height={16}
            alt="Records Icon"
          />

          <p className="text-xs ">Transactions</p>
        </Link>
        <Link href="/analysis" className="flex flex-col items-center">
          <Image
            src="/icons/chartIcon.svg"
            className=" mb-1"
            width={16}
            height={16}
            alt="Analysis Icon"
          />
          <p className="text-xs ">Analysis</p>
        </Link>
        <Link href="/profile" className="flex flex-col items-center">
          <Image
            src="/icons/userIcon.svg"
            className="mb-1"
            width={16}
            height={16}
            alt="Profile Icon"
          />
          <p className="text-xs ">Profile</p>
        </Link>
      </ul>
    </nav>
  );
};

export default NavMobile;
