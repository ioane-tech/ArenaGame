'use client'
import React from 'react'
import { useLanguage } from './(Context)/LanguageContext'
import { usePopup } from './(Context)/DetailedPopupContext';

function CardRenderer(card:any) {
  const {language} = useLanguage()
  const {setPopupOpen, setDetailId} = usePopup()

  const handelDetail = (id: any) => {
    setPopupOpen(true);
    setDetailId(id);
  };
  return (
    <div>
      <div className="flex flex-col items-center gap-2 font-bold">
        <img className="w-40 border-amber-500 border-b" src={card.card.img} alt="" />
    
        <div className='flex flex-row items-center mt-2'>
          <p className="text-xs text-gray-400 mr-2">{card.card.name}</p>
          <button 
            className='bg-transparent border border-amber-500 text-green-400 text-xs rounded w-4 h-4 mb-1' 
            onClick={() => handelDetail(card.card.id)}
          >
            {language === "geo"? "ი": "i"}
          </button>
        </div>
    
        <div className='flex flex-row'>
           <p className="text-xs text-red-500 mr-3">{card.card.hp} Hp</p>
          <p className="text-xs text-yellow-500 mb-2">{card.card.damage} Dmg</p>
         </div>
       </div> 
    </div>
  )
}

export default CardRenderer