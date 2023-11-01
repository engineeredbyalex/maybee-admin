import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Basic/Nav";
import { useState } from "react";
import Logo from "@/components/Style/Logo";
import { AiOutlineMenu } from "react-icons/ai"

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg shadow-md">Conectează-te cu Google</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen ">
      <div className=" md:hidden flex items-center p-4 absolute left-0">
        <button onClick={() => setShowNav(true)}>
          <AiOutlineMenu size={20} color="#000" />
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow px-5 py-5">
          {children}
        </div>
      </div>
    </div>
  );
}
