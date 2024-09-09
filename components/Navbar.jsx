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
        <img src="/box.webp" alt="" style={{width:"64px", borderRadius:"0.5rem"}} />
        {/* <h3 className={`logo ${pathname === "/" ? "white-logo" : ""}`}>Avalon</h3> */}
      </Link>
      <div className="navlinks">
        <UserButton />
      </div>
    </nav>
  );
}
