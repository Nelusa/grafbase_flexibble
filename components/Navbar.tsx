import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NavLinks } from "@constants";
import { useSession } from "next-auth/react";
import AuthProviders from "./AuthProviders";

const Navbar = () => {
  const session = {};

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" alt="Flexibble Logo" width={115} height={43} />
        </Link>
        <ul className="hidden xl:flex  text-small gap-7">
          {NavLinks.map((link) => {
            return (
              <li key={link.key}>
                <Link href={link.href}>{link.text}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session ? (
          <>
            UserPhoto
            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
