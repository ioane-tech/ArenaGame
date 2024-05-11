'use client'

import Image from "next/image";
import Link from "next/link";

import champData from '@/app/champData'


export default function Home() {
  return (
    <div>
      <p className="text-3xl ml-auto mr-auto"><img className="ml-auto mr-auto" src="/assets/arenaTextImg.png" alt="" /></p>
      <div className="flex flex-col gap-5 ml-auto mr-auto w-52">

        <Link href="/game">
          <button className="text-lg tracking-wide text-white border-2 border-amber-700 w-52 h-9 rounded bg-amber-500" >
            START
          </button>
        </Link>

        <Link href="/cards">
          <button className="text-lg tracking-wide text-white border-2 border-amber-700 w-52 h-9 rounded bg-amber-500" >
            Cards
          </button>
        </Link>

        <Link href="/rules">
          <button className="text-lg tracking-wide text-white border-2 border-amber-700 w-52 h-9 rounded bg-amber-500" >
            Rules
          </button>
        </Link>
      </div>
    </div>
  );
}
