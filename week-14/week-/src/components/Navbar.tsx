import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <div className="flex justify-around p-6">
        <Link className=" border-2 px-3 py-2 rounded-lg" href={"/"}>
          Home
        </Link>
        <Link className=" border-2 px-3 py-2 rounded-lg" href={"/static-page"}>
          sever page
        </Link>
        <Link
          className=" border-2 px-3 py-2 rounded-lg"
          href={"/interactive-page"}
        >
          client page
        </Link>
      </div>
    </div>
  );
}
