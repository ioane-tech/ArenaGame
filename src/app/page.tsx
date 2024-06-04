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
        className="language_button"
      >
          {language === "geo"? "geo" : "eng"}
      </div>


      <img className="mt-20 mb-10 ml-auto mr-auto w-1/3" src="/assets/arenaTextImg2.png" alt="" />


      <div className="flex flex-col gap-5 ml-auto mr-auto w-52">
        <Link href="/game">
          <button className="common_button btn-common" >
            <span>{language === "geo"? "დაწყება" : "Start"}</span>
          </button>
        </Link>

        <Link href="/cards">
          <button className="common_button btn-common" >
            <span>{language === "geo"? "კარტები" : "Cards"}</span>
          </button>
        </Link>

        <Link href="/rules">
          <button className="common_button btn-common mb-10" >
            <span>{language === "geo"? "წესები" : "Rules"}</span> 
          </button>
        </Link>
      </div>
    </div>
  );
}
