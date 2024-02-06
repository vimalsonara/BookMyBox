"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b-2 p-5">
      <div className="flex gap-2">
        <Link href={"/dashboard"} className="font-bold">
          Book My Box
        </Link>
        <div className="flex gap-2">
          <Link href={"/manage"}>Manage</Link>
        </div>
      </div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  );
}
