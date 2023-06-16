import Link from "next/link";

export default function Logo() {
  return (
    <Link href={'/'} className="flex">
      <span className="">
        MAYBEE STORE ADMIN
      </span>
    </Link>
  );
}