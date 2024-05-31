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

interface PositionsState {
  position1: Champion;
  position2: Champion;
  position3: Champion;
  position4: Champion;
  position5: Champion;
}

///////////////////////////////////////////////chemi damatebuli

function Game() {
  const {language} =useLanguage()
  const {popupOpen, setPopupOpen, detailId, setDetailId} = usePopup()


  const [yourSelectedCard, setYourSelectedCard] = useState<Champion | null>(null)

  const [yourCards,setYourCards] = useState<Champion[]>([])
  const [positions, setPositions] = useState<PositionsState>()

  const [opponentCards,setOpponentCards] = useState<Champion[]>([])
  const [opponentPositions,setOpponentPositions] =useState<PositionsState>()
  

  //your cards
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
  //opponent cards
  useEffect(() => {
    const newChampions: Champion[] = [];
    const indexes: Set<number> = new Set(); // Using a Set to ensure uniqueness

    while (indexes.size < 5) {
      indexes.add(Math.floor(Math.random() * champData.length)); // Add random indexes to the Set
    }

    indexes.forEach(index => {
      newChampions.push(champData[index]); // Fetch cards using the generated indexes
    });

    setOpponentCards(newChampions);

  }, []);


  const handleDetail = (id: any) => {
    setPopupOpen(true);
    setDetailId(id);
  };
  
  
  // your cards card selection and set positions
  const handleSetCard =(position: any, positionName: keyof PositionsState)=>{
    if(yourSelectedCard && yourCards.length > 0){
      if(!position){
        setPositions((prevPositions: PositionsState | null | undefined) => ({
          ...(prevPositions || {}), // Ensure prevPositions is not null or undefined
          [positionName]: yourSelectedCard,
        }) as PositionsState);
      }else{
        setPositions((prevPositions: PositionsState | null | undefined) => {
          if(prevPositions){
            setYourCards([...yourCards, prevPositions[positionName]]);
          }
          return {
            ...(prevPositions || {}),
            [positionName]: yourSelectedCard,
          } as PositionsState;
        });
      }
    }
    else if(yourCards.length === 0){
      setYourSelectedCard(position) 
    }
  }
  //opponent card selectiron and set position
  const handleSetOpponentCard =(position: any, positionName: keyof PositionsState)=>{
    if(yourSelectedCard && opponentCards.length > 0){
      if(!position){
        setOpponentPositions((prevPositions: PositionsState | null | undefined) => ({
          ...(prevPositions || {}), // Ensure prevPositions is not null or undefined
          [positionName]: yourSelectedCard,
        }) as PositionsState);
      }else{
        setOpponentPositions((prevPositions: PositionsState | null | undefined) => {
          if(prevPositions){
            setOpponentCards([...opponentCards, prevPositions[positionName]]);
          }
          return {
            ...(prevPositions || {}),
            [positionName]: yourSelectedCard,
          } as PositionsState;
        });
      }
    }
    else if(opponentCards.length === 0){
      setYourSelectedCard(position) 
    }
  }

  //filter your cards after positioning
  useEffect(() => {
    setYourCards(prevYourCards => prevYourCards.filter(card => card.id !== yourSelectedCard?.id));
    setYourSelectedCard(null)
  }, [positions]);
  //filter opponent cards after positioning
  useEffect(() => {
    setOpponentCards(prevYourCards => prevYourCards.filter(card => card.id !== yourSelectedCard?.id));
    setYourSelectedCard(null)
  }, [opponentPositions]);


// hit opponent cards
const opponentHandler = (opponentCard: Champion) => {
  if (yourSelectedCard && yourCards.length === 0) {
    // Create a new array with updated opponent cards
    const updatedOpponentCards = opponentCards.map(card => {
      if (card.id === opponentCard.id) {
        // Update the HP of the attacked card
        return {
          ...card,
          hp: card.hp - yourSelectedCard.damage
        };
      }
       // Return the original card if it's not the attacked card
      return card;
    });
    // Update opponentCards state with the modified array
    const filteredOpponentCard = updatedOpponentCards.filter(card => card.hp > 0);
    // if(filteredOpponentCard.length < opponentCards.length){
    //  ნიშნავს რო ვიღაც მოკვდა და hasKilled უნდა გახდეს true
    // useEffect()

    //abilitis funqciashi argumentis gadacema
    // }

    setOpponentCards(filteredOpponentCard);
  }

  setYourSelectedCard(null)
};

  return (
    <div className='flex flex-row items-center'>

      <Link 
        href='/'
        className="back_button"
      >
        {language === "geo"? "უკან" : "Back"}
      </Link>

      {/**your cards */}
      <div className="flex flex-col overflow-auto my-8 ml-5 mt-20 h-screen-80">
        {yourCards &&
          yourCards.map((value, key) => (
            <div
              onClick={()=>setYourSelectedCard(value)}
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
      </div>
      
      {popupOpen && <DetailPopup/>}

      {/*********Your card positions */}
      <div className='grid grid-rows-6 grid-cols-2 gap-4 mt-5 ml-10 h-1/2 cursor-pointer'>
          <div 
            onClick={() => handleSetCard(positions?.position1,"position1")}
            className={`min-w-32 h-58 ${positions?.position1 ? '' : 'border-amber-500 border-2'} rounded row-span-2 col-start-2`}
          >
            {
              positions?.position1?
                <CardRenderer card = {positions?.position1}/>
                :
                <p className='text-white ml-2'>position 1</p>
            }
          </div>

          <div 
            onClick={() => handleSetCard(positions?.position2,"position2")}
            className={`min-w-32 h-58 ${positions?.position2 ? '' : 'border-amber-500 border-2'} rounded row-span-2 col-start-2`}
          >
            {
              positions?.position2?
                <CardRenderer card = {positions?.position2}/>
                :
                <p className='text-white ml-2'>position 2</p>
            }
          </div>

          <div 
            onClick={() => handleSetCard(positions?.position3,"position3")}
            className={`min-w-32 h-58 ${positions?.position3 ? '' : 'border-amber-500 border-2'} rounded row-span-2 col-start-2`}
          >
            {
              positions?.position3?
                <CardRenderer card = {positions?.position3}/>
                :
                <p className='text-white ml-2'>position 3</p>
            }
          </div>

          <div
            onClick={() => handleSetCard(positions?.position4,"position4")} 
            className={`min-w-32 h-58 ${positions?.position4 ? '' : 'border-amber-500 border-2'} rounded row-span-2 col-start-1 row-start-2`}
          >
            {
              positions?.position4?
                <CardRenderer card = {positions?.position4}/>
                :
                <p className='text-white ml-2'>position 4</p>
            }
          </div>

          <div 
            onClick={() => handleSetCard(positions?.position5,"position5")}
            className={`min-w-32 h-58  ${positions?.position5 ? '' : 'border-amber-500 border-2'} rounded row-span-2 col-start-1 row-start-4`}
          >
            {
              positions?.position5?
                <CardRenderer card = {positions?.position5}/>
                :
                <p className='text-white ml-2'>position 5</p>
            }
          </div>
      </div>




      {/*********Opponent card positions */}
      <div className='grid grid-rows-6 grid-cols-2 gap-4 mt-5 ml-auto mr-10 h-1/2 cursor-pointer'>
        <div 
          onClick={() => handleSetOpponentCard(opponentPositions?.position1, "position1")}
          className={`min-w-32 h-58 ${opponentPositions?.position1 ? '' : 'border-amber-500 border-2'} rounded row-span-2 col-start-1`}
        >
          {opponentPositions?.position1 ? (
            <CardRenderer card={opponentPositions?.position1} />
          ) : (
            <p className='text-white ml-2'>position 1</p>
          )}
        </div>

        <div 
          onClick={() => handleSetOpponentCard(opponentPositions?.position2, "position2")}
          className={`min-w-32 h-58 ${opponentPositions?.position2 ? '' : 'border-amber-500 border-2'} rounded row-span-2 col-start-1 row-start-2`}
        >
          {opponentPositions?.position2 ? (
            <CardRenderer card={opponentPositions?.position2} />
          ) : (
            <p className='text-white ml-2'>position 2</p>
          )}
        </div>

        <div 
          onClick={() => handleSetOpponentCard(opponentPositions?.position3, "position3")}
          className={`min-w-32 h-58 ${opponentPositions?.position3 ? '' : 'border-amber-500 border-2'} rounded row-span-2 col-start-1 row-start-4`}
        >
          {opponentPositions?.position3 ? (
            <CardRenderer card={opponentPositions?.position3} />
          ) : (
            <p className='text-white ml-2'>position 3</p>
          )}
        </div>

        <div
          onClick={() => handleSetOpponentCard(opponentPositions?.position4, "position4")} 
          className={`min-w-32 h-58 ${opponentPositions?.position4 ? '' : 'border-amber-500 border-2'} rounded row-span-2 col-start-2 row-start-2`}
        >
          {opponentPositions?.position4 ? (
            <CardRenderer card={opponentPositions?.position4} />
          ) : (
            <p className='text-white ml-2'>position 4</p>
          )}
        </div>

        <div 
          onClick={() => handleSetOpponentCard(opponentPositions?.position5, "position5")}
          className={`min-w-32 h-58 ${opponentPositions?.position5 ? '' : 'border-amber-500 border-2'} rounded row-span-2 col-start-2 row-start-4`}
        >
          {opponentPositions?.position5 ? (
            <CardRenderer card={opponentPositions?.position5} />
          ) : (
            <p className='text-white ml-2'>position 5</p>
          )}
        </div>
      </div>

      {/*********opponent cards */}
      <div className='flex flex-col overflow-auto mt-20 mr-5 h-screen-80'>
        {opponentCards &&
            opponentCards.map((value, key) => (
              <div
              // opponentHandler(value)
                onClick={()=>setYourSelectedCard(value)}
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
        <div className='fixed left-0 top-0 bg-fadeBlack w-full h-full '>
          <div className='flex flex-col items-center w-1/2 mr-auto ml-auto mt-20'>
            <img className='w-66' src="/assets/warSwords.png" alt="" />
            <p className='text-4xl text-amber-500'>You are victorious on War Arena!</p>
            <button 
              onClick={()=>window.location.reload()}
              className='text-2xl text-amber-500 w-48 h-10 rounded border border-amber-500 mt-10'
            >
              play again!
            </button>
          </div>
        </div>
      }

      {
        (yourSelectedCard && yourCards.length === 0) &&
        <div className='flex flex-col gap-5 items-center absolute left-1/3'>
          <p className='text-amber-500 text-3xl'>{yourSelectedCard.name}</p>
          <button className='text-2xl text-amber-500 w-48 h-10 rounded border border-amber-500 mt-10'>abbility</button>
        </div>
      }
    </div>
  )
}

export default Game