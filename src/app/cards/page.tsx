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
        {champData &&
          champData.map((value, key) => (
            <div className="flex flex-col items-center gap-2 border-amber-500 border-2 rounded bg-gray-1000 font-bold mt-5" key={key}>
              <img className="w-36 border-amber-500 border-b" src={value.img} alt="" />
              <p className="text-xs text-gray-400 align-lef ">{value.name}</p>
              <div className='flex flex-row'>
                <p className="text-xs text-red-500 mr-3">{value.hp} Hp</p>
                <p className="text-xs text-yellow-500 mb-2">{value.damage} Dmg</p>
              </div>
            
              <button className='text-gray-400' onClick={() => handelDetail(key)}>Detail</button>
            </div>
          )) 
        }
        {popupOpen && (
          <div className="fixed bg-black w-full h-full ">
            {
              champData.map((value, key) => {
                if (key === detailId) {
                  return (
                    <div className="w-1/2 h-4/5 ml-auto mr-auto mt-10 flex flex-col items-center gap-2 border-amber-500 border-2 rounded bg-gray-1000 font-bold overflow-y-auto" key={key}>
                      <img className="w-2/4 border-amber-500 border-b-2" src={value.img} alt="" />
                      <p className="text-lg text-gray-400 align-lef mt-2">{value.name}</p>
                      <div className='flex flex-row'>
                        <p className="text-red-500 mr-3">{value.hp} Hp</p>
                        <p className="text-yellow-500 mb-2">{value.damage} Dmg</p>
                      </div>
                      <p className='text-gray-300 text-center w-3/4'>{value.description.eng}</p>
                      <button className='text-gray-400 mb-5 mt-5' onClick={() => setPopupOpen(false)}>Close</button>

                    </div>
                  );
                }
                return null;
              })  
            }
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Cards;
