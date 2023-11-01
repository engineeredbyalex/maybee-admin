import React from 'react'

import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { VscAccount } from "react-icons/vsc"

export default function LogOutButton() {
    const router = useRouter();
    const { pathname } = router;
    async function logout() {
        await router.push('/');
        await signOut();
    }
    return (
        <button onClick={logout} className='w-[15rem] h-[2.5rem] bg-[#000] rounded-xl text-[#fff] flex items-center justify-center '>Log Out
            <div className='absolute right-5'>
                <VscAccount size={25} />
            </div>
        </button>
    )
}

