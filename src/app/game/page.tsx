'use client'

import React, { useEffect, useState } from 'react'
import champData, { Champion } from '@/app/champData';
import { list } from 'postcss';
import { stat } from 'fs';


function Game() {
  const [firstPlace, setFirstPlace] = useState({})


  const [yourCards,setYourCards] = useState<Champion[]>([])
  const [backLineLength, setBackLineLength] = useState();
  const [popupOpen, setPopupOpen] = useState(false);
  const [detailId, setDetailId] = useState();

  useEffect(()=>{
    for(var i = 0; i < 5; i++){
      setYourCards([...yourCards, champData[Math.floor(Math.random()*30)]])
    } 
  },[])

  const handelDetail = (id: any) => {
    setPopupOpen(true);
    setDetailId(id);
  };
  return (
    <div>
      <div className="flex flex-row flex-wrap justify-center gap-8 w-3/4 ml-auto mr-auto  mb-10 border-2 border-red-500">
        {yourCards.map((value, key) => (
          <div className="flex flex-col items-center gap-2 border-amber-500 border-2 rounded bg-white font-bold mt-5" key={key}>
            <img className="w-32 border-amber-500" src={value.img} alt="" />
            <p className="text-xs text-amber-500 align-lef mt-2">{value.name}</p>
            <p className="text-xs text-green-400">{value.hp} Hp</p>
            <p className="text-xs text-red-500 mb-2">{value.damage} Damage</p>
            <button onClick={() => handelDetail(key)}>Detail</button>
          </div>
        ))}
        {popupOpen && (
          <div className="fixed bg-black w-full h-full ">
            {yourCards.map((value, key) => {
              if (key === detailId) {
                return (
                  <div className="w-1/2 ml-auto mr-auto mt-10 flex flex-col items-center gap-2 border-amber-500 border-2 rounded bg-white font-bold" key={key}>
                    <img className="w-2/4 border-amber-500" src={value.img} alt="" />
                    <p className="text-lg text-amber-500 align-lef mt-2">{value.name}</p>
                    <p className="text-lg text-green-400">{value.hp} Hp</p>
                    <p className="text-lg text-red-500 mb-2">{value.damage} Damage</p>
                    <button onClick={() => setPopupOpen(false)}>Close</button>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Game