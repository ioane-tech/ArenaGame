'use client'

import React, { useEffect, useState } from 'react'
import champData, { Champion } from '@/app/champData';
import { list } from 'postcss';
import { stat } from 'fs';
import { useLanguage } from '../(Context)/LanguageContext';
import Link from 'next/link';
import CardRenderer from '../CardRenderer';
import { usePopup } from '../(Context)/DetailedPopupContext';

interface Description {
  geo: string;
  eng: string;
}
type OneCard = {
  id: number;
  img: string;
  name: string;
  hp: number;
  damage: number;
  abilityAvailable: boolean;
  description: Description;
}

function Game() {
  const {language} =useLanguage()
  const {popupOpen, setPopupOpen, detailId, setDetailId} = usePopup()

  const [position1, setPosition1] = useState<OneCard>()
  const [position2, setPosition2] = useState<OneCard>()
  const [position3, setPosition3] = useState<OneCard>()
  const [position4, setPosition4] = useState<OneCard>()
  const [position5, setPosition5] = useState<OneCard>()

  const [selectedCard, setSelectedCard] = useState<OneCard | null>(null)

  const [yourCards,setYourCards] = useState<Champion[]>([])
  

  useEffect(() => {
    const newChampions: Champion[] = [];
    const indexes: Set<number> = new Set(); // Using a Set to ensure uniqueness

    while (indexes.size < 5) {
      indexes.add(Math.floor(Math.random() * champData.length)); // Add random indexes to the Set
    }

    indexes.forEach(index => {
      newChampions.push(champData[index]); // Fetch cards using the generated indexes
    });

    setYourCards(newChampions);
  }, []);



  const handleDetail = (id: any) => {
    setPopupOpen(true);
    setDetailId(id);
  };

  const handleSetCard =(position: number)=>{
    if(selectedCard){
      position == 1? setPosition1(selectedCard) 
      : position == 2? setPosition2(selectedCard) 
      : position == 3? setPosition3(selectedCard) 
      : position == 4? setPosition4(selectedCard) 
      : setPosition5(selectedCard) 
      setSelectedCard(null)
      setYourCards(yourCards.filter(card => card.id !== selectedCard.id));
    }
  }
  return (
    <div className='flex flex-row items-center'>

      <Link 
        href='/'
        className="back_button"
      >
        {language === "geo"? "უკან" : "Back"}
      </Link>


      <div className="flex flex-col overflow-auto w-40 my-8 ml-5 h-screen-80">
        {yourCards &&
          yourCards.map((value, key) => (
            <div
              onClick={()=>setSelectedCard(value)}
              className="card_container cursor-pointer"
              key={key}
            >
              <img className="card_img" src={value.img} alt="" />

              <div className='flex flex-row items-center mt-2'>
                <p className="text-xs text-gray-400 mr-2">{value.name}</p>
                <button 
                  className='bg-transparent border border-amber-500 text-green-400 text-xs rounded w-4 h-4 mb-1' 
                  onClick={() => handleDetail(value.id)}
                >
                  {language === "geo"? "ი": "i"}
                </button>
              </div>

              <div className='flex flex-row'>
                <p className="text-xs text-red-500 mr-3">{value.hp} Hp</p>
                <p className="text-xs text-yellow-500 mb-2">{value.damage} Dmg</p>
              </div>
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
      <div className='grid grid-rows-6 grid-cols-2 gap-4 mt-5 ml-10 h-1/2 cursor-pointer'>
          <div 
            onClick={() => handleSetCard(1)}
            className='w-40 h-58 border-amber-500 border-2 rounded row-span-2 col-start-2'
          >
            {
              position1?
                <CardRenderer card = {position1}/>
                :
                <p className='text-white ml-2'>position 1</p>
            }
          </div>

          <div 
            onClick={() => handleSetCard(2)}
            className='w-40 h-58 border-amber-500 border-2 rounded row-span-2 col-start-2'
          >
            {
              position2?
                <CardRenderer card = {position2}/>
                :
                <p className='text-white ml-2'>position 2</p>
            }
          </div>

          <div 
            onClick={() => handleSetCard(3)}
            className='w-40 h-58 border-amber-500 border-2 rounded row-span-2 col-start-2'
          >
            {
              position3?
                <CardRenderer card = {position3}/>
                :
                <p className='text-white ml-2'>position 3</p>
            }
          </div>

          <div
            onClick={() => handleSetCard(4)} 
            className='w-40 h-58 border-amber-500 border-2 rounded row-span-2 col-start-1 row-start-2'
          >
            {
              position4?
                <CardRenderer card = {position4}/>
                :
                <p className='text-white ml-2'>position 4</p>
            }
          </div>

          <div 
            onClick={() => handleSetCard(5)}
            className='w-40 h-58 border-amber-500 border-2 rounded row-span-2 col-start-1 row-start-4'
          >
            {
              position5?
                <CardRenderer card = {position5}/>
                :
                <p className='text-white ml-2'>position 5</p>
            }
          </div>
      </div>
    </div>
  )
}

export default Game