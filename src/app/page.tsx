'use client'

import Image from "next/image";
import Link from "next/link";

import champData from '@/app/champData'
import { useLanguage } from "./(Context)/LanguageContext";


export default function Home() {
  const {language, toggleLanguage }= useLanguage()

  return (
    <div>
      <div 
        onClick={toggleLanguage} 
        className="cursor-pointer absolute top-5 left-5 p-2 text-xs text-amber-500 border border-amber-500"
      >
          {language === "geo"? "geo" : "eng"}
      </div>


      <p className="text-3xl ml-auto mr-auto"><img className="ml-auto mr-auto" src="/assets/arenaTextImg.png" alt="" /></p>
      <div className="flex flex-col gap-5 ml-auto mr-auto w-52">

        <Link href="/game">
          <button className="text-lg tracking-wide text-white border-2 border-amber-700 w-52 h-9 rounded bg-amber-500" >
            {language === "geo"? "დაწყება" : "Start"}
          </button>
        </Link>

        <Link href="/cards">
          <button className="text-lg tracking-wide text-white border-2 border-amber-700 w-52 h-9 rounded bg-amber-500" >
            {language === "geo"? "კარტები" : "Cards"}
          </button>
        </Link>

        <Link href="/rules">
          <button className="text-lg tracking-wide text-white border-2 border-amber-700 w-52 h-9 rounded bg-amber-500" >
            {language === "geo"? "წესები" : "Rules"}
          </button>
        </Link>
      </div>
    </div>
  );
}
