'use client'

import React, { useEffect, useState } from 'react'
import champData, { Champion } from '@/app/champData';
import { list } from 'postcss';
import { stat } from 'fs';
import { useLanguage } from '../(Context)/LanguageContext';
import Link from 'next/link';
import CardRenderer from '../Components/CardRenderer';
import { usePopup } from '../(Context)/DetailedPopupContext';
import DetailPopup from '../Components/DetailPopup';

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
  const [opponentCards,setOpponentCards] = useState<Champion[]>([champData[16],champData[17]])
  const [backLineLength, setBackLineLength] = useState();
  

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

  //card selection and set positions
  const handleSetCard =(position: number, card: any)=>{
    if(selectedCard && yourCards.length > 0){
      position == 1? setPosition1(selectedCard) 
      : position == 2? setPosition2(selectedCard) 
      : position == 3? setPosition3(selectedCard) 
      : position == 4? setPosition4(selectedCard) 
      : setPosition5(selectedCard) 
      setSelectedCard(null)
      setYourCards(yourCards.filter(card => card.id !== selectedCard.id));
    }
    else if(yourCards.length === 0){
      setSelectedCard(card) 
    }
  }

// hit opponent cards
const opponentHandler = (opponentCard: OneCard) => {
  if (selectedCard && yourCards.length === 0) {
    // Create a new array with updated opponent cards
    const updatedOpponentCards = opponentCards.map(card => {
      if (card.id === opponentCard.id) {
        // Update the HP of the attacked card
        return {
          ...card,
          hp: card.hp - selectedCard.damage
        };
      }
       // Return the original card if it's not the attacked card
      return card;
    });
    // Update opponentCards state with the modified array
    const filteredOpponentCard = updatedOpponentCards.filter(card => card.hp > 0);

    setOpponentCards(filteredOpponentCard);
  }

  setSelectedCard(null)
};

  return (
    <div className='flex flex-row items-center'>

      <Link 
        href='/'
        className="back_button"
      >
        {language === "geo"? "უკან" : "Back"}
      </Link>


      <div className="flex flex-col overflow-auto my-8 ml-5 mt-20 h-screen-80">
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
                  i
                </button>
              </div>

              <div className='flex flex-row'>
                <p className="text-xs text-red-500 mr-3">{value.hp} Hp</p>
                <p className="text-xs text-yellow-500 mb-2">{value.damage} Dmg</p>
              </div>
            </div>
          ))  
        }
        {popupOpen && <DetailPopup/>}
      </div>

      {/*********Your card positions */}
      <div className='grid grid-rows-6 grid-cols-2 gap-4 mt-5 ml-10 h-1/2 cursor-pointer'>
          <div 
            onClick={() => handleSetCard(1, position1)}
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
            onClick={() => handleSetCard(2, position2)}
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
            onClick={() => handleSetCard(3, position3)}
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
            onClick={() => handleSetCard(4, position4)} 
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
            onClick={() => handleSetCard(5, position5)}
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



      {/*********opponent cards */}
      <div className='flex flex-col ml-auto mr-32'>
        {opponentCards &&
            opponentCards.map((value, key) => (
              <div
                onClick={()=>opponentHandler(value)}
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
                    i
                  </button>
                </div>

                <div className='flex flex-row'>
                  <p className="text-xs text-red-500 mr-3">{value.hp} Hp</p>
                  <p className="text-xs text-yellow-500 mb-2">{value.damage} Dmg</p>
                </div>
              </div>
            ))  
          }
         {popupOpen && <DetailPopup />}
      </div>


      {/** war swords image */}
      {
        opponentCards.length === 0 &&
        <div className='absolute left-1/3 top-66 flex flex-col items-center'>
          <img className='w-66' src="/assets/warSwords.png" alt="" />
          <p className='text-4xl text-amber-500'>You are victorious on War Arena!</p>
        </div>
      }
    </div>
  )
}

export default Game