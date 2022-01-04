import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { authCheckState, authUserState } from "../store/auth";

export default function Navbar() {
  const router = useRouter();
  const setAuthCheck = useSetRecoilState(authCheckState);
  const authUser = useRecoilValueLoadable(authUserState);
  const logoutHandler = async () => {
     await axios.post('/logout');
     setAuthCheck(false);
     router.replace('/login');
  }
  useEffect(() => {}, [authUser.contents]);
  return (
    <div className="py-3 shadow-sm bg-white">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href={'/'}>
              <a className="block px-4 py-2 rouded-lg hover:bg-indigo-50 font-medium trasition duration-300">RYSB</a>
            </Link>
            <Link href={'/dashboard'}>
              <a className="block px-4 py-2 rouded-lg hover:bg-indigo-50 font-medium trasition duration-300">Dashboard</a>
            </Link>
          </div>
          {(authUser.contents && authUser.state === 'hasValue') ?
            <div className="flex items-center">
              <Link href="/login">
                <a className="flex items-center px-4 py-2 rouded-lg hover:bg-indigo-50 font-medium trasition duration-300">
                  <div className="flex-shrink-0 mr-3">
                    <img className="rounded-full w-6 h-6" src={authUser.contents.picture} alt={authUser.contents.name} />
                  </div>
                  <span>
                    {authUser.contents.name}
                  </span>
                </a>
              </Link>
              <Link href="/register">
                <button type="button" onClick={logoutHandler} className="focus:outline-none block px-4 py-2 rouded-lg hover:bg-indigo-50 font-medium trasition duration-300">Logout</button>
              </Link>
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
