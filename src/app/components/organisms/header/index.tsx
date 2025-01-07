// components/organisms/Header.tsx
import { LogoutAction } from "@/app/utils/logout/action";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/about" className="hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div onClick={LogoutAction}>Log out</div>
      </div>
    </header>
  );
};

export default Header;
