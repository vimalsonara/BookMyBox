"use client";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const user = useUser();
  console.log(user);
  return (
    <main>
      <div>{!user.isSignedIn && <SignInButton />}</div>
      <div>{!!user.isSignedIn && <SignOutButton />}</div>
    </main>
  );
}
