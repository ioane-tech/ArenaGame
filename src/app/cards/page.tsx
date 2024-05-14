'use client'

import React, { useState } from 'react';
import champData, { Champion } from '@/app/champData'; // Assuming champData is imported correctly
import Link from 'next/link';
import { useLanguage } from '../(Context)/LanguageContext';
import { usePopup } from '../(Context)/DetailedPopupContext';
import DetailPopup from '../Components/DetailPopup';

function Cards() {
  const {language} =useLanguage()
  const { popupOpen, setPopupOpen, detailId, setDetailId} =usePopup()

  const handelDetail = (id: any) => {
    setPopupOpen(true);
    setDetailId(id);
  };

  return (
    <div>
      <Link 
        href='/'
        className="back_button"
      >
        {language === "geo"? "უკან" : "Back"}
      </Link>
      
      <div className="flex flex-row flex-wrap justify-center gap-8 w-3/4 ml-auto mr-auto mb-10">
        {champData &&
          champData.map((value, key) => (
            <div className="card_container" key={key}>
              <img className="card_img" src={value.img} alt="" />
              <p className="text-xs text-gray-400">{value.name}</p>
              <div className='flex flex-row'>
                <p className="text-xs text-red-500 mr-3">{value.hp} Hp</p>
                <p className="text-xs text-yellow-500 mb-2">{value.damage} Dmg</p>
              </div>
            
              <button 
                className='text-gray-400 text-xs mb-2' 
                onClick={() => handelDetail(value.id)}
              >
                {language === "geo"? "ინფორმაცია": "information"}
              </button>
            </div>
          )) 
        }
        {popupOpen && <DetailPopup />}
      </div>
      
    </div>
  );
}

export default Cards;
