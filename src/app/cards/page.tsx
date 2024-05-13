'use client'

import React, { useState } from 'react';
import champData, { Champion } from '@/app/champData'; // Assuming champData is imported correctly
import Link from 'next/link';
import { useLanguage } from '../(Context)/LanguageContext';
import { usePopup } from '../(Context)/DetailedPopupContext';

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
                className='text-gray-400 text-xs mb-1' 
                onClick={() => handelDetail(value.id)}
              >
                {language === "geo"? "ინფორმაცია": "information"}
              </button>
            </div>
          )) 
        }
        {popupOpen && (
          <div className="detailed_popup_bg">
            {
              champData.map((value, key) => {
                if (value.id === detailId) {
                  return (
                    <div className="detailed_popup_container" key={key}>
                      <img className="detailed_popup_img" src={value.img} alt="" />
                      <p className="detailed_popup_name">{value.name}</p>
                      
                      <div className='flex flex-row'>
                        <p className="text-red-500 mr-3">{value.hp} Hp</p>
                        <p className="text-yellow-500 mb-2">{value.damage} Dmg</p>
                      </div>

                      <p className='detailed_popup_description'>
                        {language === "geo"? value.description.geo :  value.description.eng}
                      </p>

                      <button className='detailed_popup_close' onClick={() => setPopupOpen(false)}>
                        {language === "geo"? "დახურვა": "Close"}
                      </button>

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
