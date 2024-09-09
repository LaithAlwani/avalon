"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav>
      <Link href="/">
        <h3 className={`logo ${pathname === "/" ? "inverted-logo" : ""}`}>Avalon</h3>
      </Link>
      <div className="navlinks">
        <UserButton />
      </div>
    </nav>
  );
}
