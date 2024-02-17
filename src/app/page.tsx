'use client'

import {Button} from "@nextui-org/react";
import {signOut} from "next-auth/react";

export default function Home() {
  return (
    <div className={'h-screen w-screen flex flex-col items-center justify-center'}>
      <h1 className={'text-2xl font-bold mb-4'}>Udało Ci się zalogować</h1>
      <Button color={'primary'} onClick={() => signOut({callbackUrl: '/login'})}>A teraz się wyloguj</Button>
    </div>
  );
}
