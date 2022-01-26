import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { authCheckState, authUserState } from "../store/auth";
import { Popover, Transition } from '@headlessui/react'

export default function Navbar() {
  const router = useRouter();
  const setAuthCheck = useSetRecoilState(authCheckState);
  const authUser = useRecoilValueLoadable(authUserState);
  const logoutHandler = async () => {
    await axios.post('/logout');
    setAuthCheck(false);
    router.replace('/login');
  }
  useEffect(() => { }, [authUser.contents, setAuthCheck]);
  return (
    <div className="py-3 shadow-sm bg-white">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href={'/'}>
              <a className="block px-4 py-2 rouded-lg hover:bg-indigo-50 font-bold text-xl trasition duration-300">Nextwind</a>
            </Link>
            <Link href={'/dashboard'}>
              <a className="block px-4 py-2 rouded-lg hover:bg-indigo-50 font-medium trasition duration-300">Dashboard</a>
            </Link>
          </div>
          {(authUser.contents && authUser.state === 'hasValue') ?
            <div className="flex items-center">
              <Popover className="relative">
                <Popover.Button className="flex items-center px-4 py-2 hover:text-indigo-500 font-medium transition duration-300 focus:outline-none">
                  <span>
                    {authUser.contents.name}
                  </span>
                  <div className="flex-shrink-0 ml-3">
                    <img className="rounded-full w-7 h-7" src={authUser.contents.picture} alt={authUser.contents.name} />
                  </div>
                </Popover.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Popover.Panel static className="absolute py-1 border rounded-xl shadow-md overflow-hidden bg-white w-56 right-0">
                    <Link href={`/${authUser.contents.username}`}>
                      <a className="block px-4 py-2 hover:text-indigo-600 transition duration-300">View Profile</a>
                    </Link>
                    <Link href={'/settings/profile'}>
                      <a className="block px-4 py-2 hover:text-indigo-600 transition duration-300">Update Profile</a>
                    </Link>
                    <Link href={'/settings/password'}>
                      <a className="block px-4 py-2 hover:text-indigo-600 transition duration-300">Update Password</a>
                    </Link>
                    <button type="button" onClick={logoutHandler} className="focus:outline-none w-full px-4 py-2 hover:text-indigo-600 text-left transition duration-300">Logout</button>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </div>
            :
            <div className="flex items-center">
              <Link href="/login">
                <a className="block px-4 py-2 rouded-lg hover:bg-indigo-50 font-medium trasition duration-300">Login</a>
              </Link>
              <Link href="/register">
                <a className="block px-4 py-2 rouded-lg hover:bg-indigo-50 font-medium trasition duration-300">Register</a>
              </Link>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
