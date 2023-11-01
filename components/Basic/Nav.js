
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Logo from "@/components/Style/Logo";
import { useState, useEffect } from "react";
import ToggledNavItem from "./NavList";
import { useSession } from "next-auth/react";
import LogOutButton from "./Buttons/LogOutButton";

export default function Nav({ show }) {
  const { data: session } = useSession();

  const [isToggled, setIsToggled] = useState(false)

  const router = useRouter();
  const { pathname } = router;
  async function logout() {
    await router.push('/');
    await signOut();
  }



  return (
    <div className={(show ? 'left-0' : '-left-full') + " top-0 text-[#000] p-4 fixed w-full bg-[#fff] min-h-[100vh] md:static md:w-auto transition-all"}>
      <div className="mb-4 mr-4">
        <Logo />
      </div>
      <nav className="flex flex-col gap-2">
        <span className="text_light">Meniu</span>
        <ToggledNavItem
          text="Produse"
          links={[
            { label: 'Vezi produse', url: '/productsList' },
            { label: 'Adauga produse', url: '/products' },
            { label: 'Setari produse', url: '/productsSettings' },
          ]}
        />
        <ToggledNavItem
          text="Comenzi"
          links={[
            { label: 'Vezi comenzi', url: '/' },
            { label: 'Setari comenzi', url: '/' },
          ]}
        />
        <ToggledNavItem
          text="Statistici"
          links={[
            { label: 'Statistici produse', url: '/' },
            { label: 'Statistici comenzi', url: '/' },
            { label: 'Statistici venit', url: '/' },
          ]}
        />
        <ToggledNavItem
          text="Blog"
          links={[
            { label: 'Setarti cont', url: '/' },
            { label: 'Statistici comenzi', url: '/' },
            { label: 'Statistici venit', url: '/' },
          ]}
        />
        <ToggledNavItem
          text="Setari"
          links={[
            { label: 'Disscount', url: '/' },
            { label: 'Setari comenzi', url: '/' },
            { label: 'Empty', url: '/' },
          ]}
        />
        <div className="bg-[#fff] flex flex-col justify-center items-center py-5 px-5 absolute bottom-[4rem] left-0">
          <div className="hidden sm:block">
            <div className="bg-[#fff] flex gap-1 text-[#000]  overflow-hidden items-center justify-center">
              <img src={session?.user?.image} alt="" className="w-8 h-8" />
              <span className="px-2">
                {session?.user?.name}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[2rem]">
          <LogOutButton />
        </div>
      </nav>
    </div>
  );
}