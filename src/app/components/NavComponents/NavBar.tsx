import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import NavCart from "./NavCart";
import { FaUser } from "react-icons/fa";

const NavBar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="navbar bg-base-100 flex justify-between fixed top-0 z-50">
      <Link href="/" className="btn btn-ghost text-xl">
        Home
      </Link>
      <div className="flex">
        {session ? (
          <>
            <Link href="/order" className="btn btn-ghost text-l">
              Order
            </Link>
            <Link href="/reservation" className="btn btn-ghost text-l">
              Reservation
            </Link>
            <NavCart email={session.user.email} userCart={session.user.cart} />
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                {session.user!.email} <FaUser />
              </div>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link href={"/profile"}>Profile</Link>
                </li>
                <li>
                  <Link href={"/api/auth/signout"}>Log out</Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link href="/menu" className="btn btn-ghost text-l">
              Menu
            </Link>
            <Link href="/reservation" className="btn btn-ghost text-l">
              Reservation
            </Link>
            <Link className="btn btn-ghost text-l" href={"/api/auth/signin"}>
              Log in
            </Link>
            <Link className="btn btn-ghost text-l" href={"/register"}>
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
