import axios from "axios";
import Head from "next/head"
import { useRouter } from "next/router";
import Notiflix from "notiflix";
import { useEffect } from "react";
import { useRecoilValueLoadable } from "recoil"
import useVerifyEmail from "../hooks/useVerifyEmail";
import { authUserState } from "../store/auth"
import Navbar from "./Navbar"

export default function Layout({ title, children, middleware }) {
  const authUser = useRecoilValueLoadable(authUserState);
  const router = useRouter();
  const { resendEmailVerification } = useVerifyEmail();
  useEffect(() => {
    if (middleware === 'guest' && authUser.state === 'hasValue' && authUser.contents) {
      router.replace('/dashboard');
    }
    if (middleware === 'auth' && authUser.contents == null) {
      router.replace('/login');
    }
  }, [authUser.contents]);
  return (
    <div>
      <Head>
        <title>
          {title || 'RYSB '}
        </title>
      </Head>
      {(authUser.contents && authUser.state === 'hasValue' && !authUser.contents.has_verified) &&
        <button onClick={resendEmailVerification} className="p-4 w-full text-white bg-rose-500 hover:bg-rose-400 transition duration-300">
          You need to verified your email to continue!
        </button>
      }
      <div className="min-h-screen">
        <Navbar></Navbar>
        <div className="pt-10">
          {children}
        </div>
      </div>
    </div>
  )
}
