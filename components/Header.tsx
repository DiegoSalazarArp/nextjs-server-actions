"use client";

import { useState, useEffect } from "react";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Posts", href: "/posts" },
  { label: "Create post", href: "/create-post" },
];

export default function Header() {
  const supabase = createClientComponentClient();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error);
      } else {
        console.log("Session data:", data);
        setSession(data.session);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT" || event === "SIGNED_IN") {
          setSession(session);
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      window.location.href = "/"; // This will refresh the page and redirect to the homepage
    }
  };

  return (
    <header className="flex justify-between items-center py-4 px-7 border-b">
      <Link href="/">
        <Image
          className="w-[35px] h-[45px]"
          src="/vercel.svg"
          alt="logo"
          width={35}
          height={35}
        />
      </Link>
      <nav>
        <ul className="flex gap-x-5 text-[14px]">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className={` ${pathname === link.href ? "text-zinc-900" : "text-zinc-400"}`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {session ? (
            <li>
              <button className="text-zinc-400" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link className="text-zinc-400" href="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
