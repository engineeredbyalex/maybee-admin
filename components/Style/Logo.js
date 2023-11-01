import Link from "next/link";

export default function Logo() {
  return (
    <Link href={'/'} className="flex w-[15rem] gap-1 items-center justify-center text-center">
      <span className="logo">Zenny</span>
      <span className="logo_sec">Dashboard</span>
    </Link>
  );
}