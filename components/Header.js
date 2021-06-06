import React from 'react'
import Image from "next/image"

import { BellIcon ,
         ChatIcon,
         HomeIcon,
         UserGroupIcon,
         ViewGridIcon,
         ChevronDownIcon,
 } from '@heroicons/react/solid'


 import { FlagIcon,
          PlayIcon,
          SearchIcon,
          ShoppingCartIcon,
} from '@heroicons/react/outline'
import HeaderIcon from './HeaderIcon'
import {  signOut, useSession } from 'next-auth/client'


function Header() {

    const [session] = useSession();
    return (
        <div className="sticky top-0  z-50 bg-white flex  items-center p-2  lg:px-5 shadow-md " >
            <div className="flex items-center">
                <Image src="https://links.papareact.com/5me" width={40} height={40} layout="fixed" />
                <div className="flex items-center ml-2 rounded-full bg-gray-100 p-2">
                    <SearchIcon className="h-6  text-gray-600"  />
                    <input className="hidden md:inline-flex flex flex-shrink items-center ml-2 bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search Facebook" />
                </div>
            </div>

            <div className="flex justify-center flex-grow"> 
                <div className="flex space-x-6 md:space-x-2">
                    <HeaderIcon active Icon={HomeIcon}/>
                    <HeaderIcon Icon={FlagIcon}/>
                    <HeaderIcon Icon={PlayIcon}/>
                    <HeaderIcon Icon={ShoppingCartIcon}/>
                    <HeaderIcon Icon={UserGroupIcon}/>
                </div>
            </div>

           
           <div className=" flex items-center sm:space-x-2 justify-end ">

            <Image
            onClick={signOut}
            className="rounded-full cursor-pointer"
            src={session.user.image}
            width= "40"
            height="40" 
            layout="fixed"

            />

     
             <p className="  hidden sm:inline-flex  whitespace-nowrap font-semibold pr-2 ">{session.user.name}</p>
             <ViewGridIcon className="icon"/>
             <ChatIcon className="icon"/>
             <BellIcon className="icon"/>
             <ChevronDownIcon className="icon"/>
           </div>
 
    

            
        </div>
    )
}

export default Header
