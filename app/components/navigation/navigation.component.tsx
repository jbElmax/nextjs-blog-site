'use client'
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useUser } from "@/app/context/user.context";
import { useState } from "react";


const Navigation = ()=>{
    const pathname = usePathname();
    const { user } = useUser();

    return(
        <div className="flex lg:flex-row flex-col justify-between shadow-md py-6 bg-amber-100 place-items-center pl-[50px] pr-[50px] fixed top-0 w-full">
            <div className="flex gap-x-2 place-items-center lg:flex-row flex-col">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                </svg> 
                
                <Link href="/" className="text-gray-700 text-lg font-medium">CodeCrafters Blog</Link>

            </div>
            <nav className="">
                <ul className="flex lg:flex-row flex-col text-gray-700 text-lg px-2 mr-[100px]">
                    <li className="px-3">
                        <Link href="/" className={`hover:text-amber-500 ${pathname ==='/' ? 'text-amber-600 border-b-2 border-amber-200':''}`}>Home</Link>
                    </li>
                    <li className="px-3">
                        <Link href="/featured" className={`hover:text-amber-500 ${pathname === '/featured' ? 'text-amber-600 border-b-2 border-amber-200' : 'text-gray-700'}`}>Featured</Link>
                    </li>
                
                    <li className="px-3">
                        <Link href="/tutorials" className={`hover:text-amber-500 ${pathname === '/tutorials' ? 'text-amber-600 border-b-2 border-amber-200' : 'text-gray-700'}`}>Tutorials</Link>
                    </li>
                    <li className="px-3">
                        <Link href="/news" className={`hover:text-amber-500 ${pathname === '/news' ? 'text-amber-600 border-b-2 border-amber-200' : 'text-gray-700'}`}>News</Link>
                    </li>
                    <li className="px-3">
                        <Link href="/tech-trends" className={`hover:text-amber-500 ${pathname === '/tech-trends' ? 'text-amber-600 border-b-2 border-amber-200' : 'text-gray-700'}`}>Tech Trends</Link>
                    </li>

                    <li className="px-3">
                        <Link href="/about-us" className={`hover:text-amber-500 ${pathname === '/about-us' ? 'text-amber-600 border-b-2 border-amber-200' : 'text-gray-700'}`}>About</Link>
                    </li>

                </ul>
            </nav>
            <div >
            {user ? (

                        <Link href="/dashboard" className={`hover:text-amber-500 ${pathname === '/dashboard' ? 'text-amber-600 border-b-2 border-amber-200' : 'text-gray-700'}`}>
                            Dashboard
                        </Link>
         
                ) : (
  

                    <Link href = "/auth"className={`hover:text-amber-500 ${pathname === '/auth' ? 'text-amber-600 border-b-2 border-amber-200' : 'text-gray-700'}`}>
                        Sign In
                    </Link>
        
              
                )}
            </div>


        </div>
    )
}

export default Navigation;