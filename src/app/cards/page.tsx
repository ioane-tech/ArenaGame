'use client'

import React, { useState } from 'react';
import champData, { Champion } from '@/app/champData'; // Assuming champData is imported correctly
import Link from 'next/link';

function Cards() {
  const [backLineLength, setBackLineLength] = useState();
  const [popupOpen, setPopupOpen] = useState(false);
  const [detailId, setDetailId] = useState();

  const handelDetail = (id: any) => {
    setPopupOpen(true);
    setDetailId(id);
  };

  return (
    <div>
      
      <div className="flex flex-row flex-wrap justify-center gap-8 w-3/4 ml-auto mr-auto mb-10">
        {champData.map((value, key) => (
          <div className="flex flex-col items-center gap-2 border-amber-500 border-2 rounded bg-gray-1100 font-bold mt-5" key={key}>
            <img className="w-36 border-amber-500 border-b" src={value.img} alt="" />
            <p className="text-xs text-gray-400 align-lef ">{value.name}</p>
            <div className='flex flex-row'>
              <p className="text-xs text-red-500 mr-3">{value.hp} Hp</p>
              
              <p className="text-xs text-yellow-500 mb-2">{value.damage} Dmg</p>
            </div>
           
            {/* <button onClick={() => handelDetail(key)}>Detail</button> */}
          </div>
        ))}
        {popupOpen && (
          <div className="fixed bg-black w-full h-full ">
            {champData.map((value, key) => {
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
  );
}

export default Cards;
