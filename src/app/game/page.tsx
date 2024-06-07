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

interface activeChampoins {
  id: number;
  img: string;
  name: string;
  hp: number;
  damage: number;
  abilityAvailable: boolean;
  description: Description;
  hasKilled: boolean;
  abilityType: string;
}

interface PositionsState {
  position1: activeChampoins;
  position2: activeChampoins;
  position3: activeChampoins;
  position4: activeChampoins;
  position5: activeChampoins;
}

///////////////////////////////////////////////chemi damatebuli

function Game() {
  const {language} =useLanguage()
  const {popupOpen, setPopupOpen, detailId, setDetailId} = usePopup()

  const [turn,SetTurn] = useState("Left Player")


  const [selectedCard, setSelectedCard] = useState<activeChampoins | null>(null)
  


  
  const [yourCards,setYourCards] = useState<activeChampoins[]>([])
  const [positions, setPositions] = useState<PositionsState>()

  const [opponentCards,setOpponentCards] = useState<activeChampoins[]>([])
  const [opponentPositions,setOpponentPositions] =useState<PositionsState>()
  

  //fetch 5 different random cards from champData for left player
  useEffect(() => {
    const newChampions: activeChampoins[] = [];
    const indexes: Set<number> = new Set(); // Using a Set to ensure uniqueness

    while (indexes.size < 5) {
      indexes.add(Math.floor(Math.random() * champData.length)); // Add random indexes to the Set
    }

    indexes.forEach(index => {
      newChampions.push({...champData[index], hasKilled: false}); // Fetch cards using the generated indexes
    });

    setYourCards(newChampions);

  }, []);

  //fetch 5 different random cards from champData for Right player
  useEffect(() => {
    const newChampions: activeChampoins[] = [];
    const indexes: Set<number> = new Set(); // Using a Set to ensure uniqueness

    while (indexes.size < 5) {
      indexes.add(Math.floor(Math.random() * champData.length)); // Add random indexes to the Set
    }

    indexes.forEach(index => {
      newChampions.push({...champData[index], hasKilled: false}); // Fetch cards using the generated indexes
    });

    setOpponentCards(newChampions);

  }, []);


  // opening detail popup
  const handleDetail = (id: any) => {
    setPopupOpen(true);
    setDetailId(id);
  };
  

  //card selection and set positions for both team
  const handleSetPosition =(position: any, positionName: keyof PositionsState)=>{
    if( turn === "Left Player"){
      if(selectedCard && yourCards.length > 0){
        if(!position){
          setPositions((prevPositions: PositionsState | null | undefined) => ({
            ...(prevPositions || {}), // Ensure prevPositions is not null or undefined
            [positionName]: selectedCard,
          }) as PositionsState);
          SetTurn('Right Player')
        }else{
          // setPositions((prevPositions: PositionsState | null | undefined) => {
          //   if(prevPositions){
          //     setYourCards([...yourCards, prevPositions[positionName]]);
          //   }
          //   return {
          //     ...(prevPositions || {}),
          //     [positionName]: selectedCard,
          //   } as PositionsState;
          // });
          
        }
      }
      else if(yourCards.length === 0 && turn === "Left Player"){
        setSelectedCard(position) 
      }
    }


    if( turn === "Right Player"){
      if(selectedCard && opponentCards.length > 0 ){
        if(!position){
          setOpponentPositions((prevPositions: PositionsState | null | undefined) => ({
            ...(prevPositions || {}), // Ensure prevPositions is not null or undefined
            [positionName]: selectedCard,
          }) as PositionsState);
          SetTurn('Left Player')
        }else{
          // setOpponentPositions((prevPositions: PositionsState | null | undefined) => {
          //   if(prevPositions){
          //     setOpponentCards([...opponentCards, prevPositions[positionName]]);
          //   }
          //   return {
          //     ...(prevPositions || {}),
          //     [positionName]: selectedCard,
          //   } as PositionsState;
          // });
        }
      }
      else if(opponentCards.length === 0  && turn === "Right Player"){
        setSelectedCard(position) 
      }
    }
  }
  

  //filter your cards and reset selectedCardmain
  useEffect(() => {
    setYourCards(prevYourCards => prevYourCards.filter(card => card.id !== selectedCard?.id));
    setSelectedCard(null)
  }, [positions]);

  //filter opponent cards after positioning
  useEffect(() => {
    setOpponentCards(prevYourCards => prevYourCards.filter(card => card.id !== selectedCard?.id));
    setSelectedCard(null)
  }, [opponentPositions]);




  // hit opponent cards
  const opponentHandler = (opponentCard: Champion) => {
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
      
      // checking if any opponent card got "killed"
      const filteredOpponentCard = updatedOpponentCards.filter(card => card.hp > 0);

      // setting hasKilled as true for selected card
      if(filteredOpponentCard.length < opponentCards.length){
        setPositions(prevPositions => {
          if (!prevPositions) return prevPositions;
          
          // Find the position that matches the selectedCard.id
          const updatedPositions = { ...prevPositions };
          for (const key in updatedPositions) {
            if (updatedPositions[key as keyof PositionsState].id === selectedCard.id) {
              updatedPositions[key as keyof PositionsState] = {
                ...updatedPositions[key as keyof PositionsState],
                hasKilled: true
              };
            }
          }
          return updatedPositions;
        });

      }

      //abilitis funqciashi argumentis gadacema

      setOpponentCards(filteredOpponentCard);
    }

    setSelectedCard(null)
    
  };
  
  // refresh abilities on kill
  useEffect(()=>{
    // if(yourCards.length === 0){
      setPositions(prevPositions => {
        if (!prevPositions) return prevPositions;
        const updatedPositions = { ...prevPositions };
          for (const key in updatedPositions) {
            if (updatedPositions[key as keyof PositionsState].hasKilled) {
              updatedPositions[key as keyof PositionsState] = {
                ...updatedPositions[key as keyof PositionsState],
                  abilityAvailable: true,
                  hasKilled: false
              };
            }
          }
        return updatedPositions;
      })
  //  }

  },[positions?.position1?.hasKilled,
    positions?.position2?.hasKilled,
    positions?.position3?.hasKilled,
    positions?.position4?.hasKilled,
    positions?.position5?.hasKilled,])

  return (
    <div className='flex flex-row items-center'>

      <Link 
        href='/'
        className="back_button"
      >
        {language === "geo"? "უკან" : "Back"}
      </Link>

      {/* your cards */}
      <div className="flex flex-col overflow-auto my-8 ml-5 mt-20 h-screen-80">
        {yourCards &&
          yourCards.map((value, key) => (
            <div
              onClick={()=>turn === "Left Player"? setSelectedCard(value) : setSelectedCard(null)}
              className="card_container_starter cursor-pointer"
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
      <div className='grid grid-rows-6 grid-cols-2 gap-4 mt-5 ml-10 mr-auto h-1/2 cursor-pointer'>
          <div 
            onClick={() =>turn === 'Left Player' && handleSetPosition(positions?.position1,"position1")}
            className={`min-w-32  ${positions?.position1 ? '' : 'border-amber-500 border-2'} rounded row-span-2 col-start-2`}
          >
            {
              positions?.position1?
                <CardRenderer card = {positions?.position1}/>
                :
                <p className='text-white ml-2'>position 1</p>
            }
          </div>

          <div 
            onClick={() =>turn === 'Left Player' && handleSetPosition(positions?.position2,"position2")}
            className={`min-w-32  ${positions?.position2 ? '' : 'border-amber-500 border-2'} rounded row-span-2 col-start-2`}
          >
            {
              positions?.position2?
                <CardRenderer card = {positions?.position2}/>
                :
                <p className='text-white ml-2'>position 2</p>
            }
          </div>

          <div 
            onClick={() =>turn === 'Left Player' && handleSetPosition(positions?.position3,"position3")}
            className={`min-w-32  ${positions?.position3 ? '' : 'border-amber-500 border-2'} rounded row-span-2 col-start-2`}
          >
            {
              positions?.position3?
                <CardRenderer card = {positions?.position3}/>
                :
                <p className='text-white ml-2'>position 3</p>
            }
          </div>

          <div
            onClick={() =>turn === 'Left Player' && handleSetPosition(positions?.position4,"position4")} 
            className={`min-w-32  ${positions?.position4 ? '' : 'border-amber-500 border-2'} rounded row-span-2 col-start-1 row-start-2`}
          >
            {
              positions?.position4?
                <CardRenderer card = {positions?.position4}/>
                :
                <p className='text-white ml-2'>position 4</p>
            }
          </div>

          <div 
            onClick={() =>turn === 'Left Player' && handleSetPosition(positions?.position5,"position5")}
            className={`min-w-32   ${positions?.position5 ? '' : 'border-amber-500 border-2'} rounded row-span-2 col-start-1 row-start-4`}
          >
            {
              positions?.position5?
                <CardRenderer card = {positions?.position5}/>
                :
                <p className='text-white ml-2'>position 5</p>
            }
          </div>
      </div>



      {/* selected Cards and turns */}
      <div className='flex flex-col mr-auto ml-auto'>
        <div className='text-4xl text-amber-400 mb-32'>
          {turn} Turn
        </div>
        {
          (selectedCard && yourCards.length === 0 && opponentCards.length === 0) &&
          <div className='flex flex-col gap-5 items-center mb-48'>
            <p className='text-amber-500 text-3xl'>{selectedCard.name}</p>
            <button className='text-2xl text-amber-500 w-48 h-10 rounded border border-amber-500 mt-10'>abbility</button>
          </div>
        }
      </div>



      {/*********Opponent card positions */}
      <div className='grid grid-rows-6 grid-cols-2 gap-4 mt-5 ml-auto mr-10 h-1/2 cursor-pointer'>
        <div 
          onClick={() =>turn === "Right Player" && handleSetPosition(opponentPositions?.position1, "position1")}
          className={`min-w-32  ${opponentPositions?.position1 ? '' : 'border-amber-500 border-2'} rounded row-span-2`}
        >
          {opponentPositions?.position1 ? (
            <CardRenderer card={opponentPositions?.position1} />
          ) : (
            <p className='text-white ml-2'>position 1</p>
          )}
        </div>

        <div 
          onClick={() =>turn === "Right Player" && handleSetPosition(opponentPositions?.position2, "position2")}
          className={`min-w-32  ${opponentPositions?.position2 ? '' : 'border-amber-500 border-2'} rounded row-span-2 row-start-3`}
        >
          {opponentPositions?.position2 ? (
            <CardRenderer card={opponentPositions?.position2} />
          ) : (
            <p className='text-white ml-2'>position 2</p>
          )}
        </div>

        <div 
          onClick={() =>turn === "Right Player" && handleSetPosition(opponentPositions?.position3, "position3")}
          className={`min-w-32  ${opponentPositions?.position3 ? '' : 'border-amber-500 border-2'} rounded row-span-2 row-start-5`}
        >
          {opponentPositions?.position3 ? (
            <CardRenderer card={opponentPositions?.position3} />
          ) : (
            <p className='text-white ml-2'>position 3</p>
          )}
        </div>

        <div
          onClick={() =>turn === "Right Player" && handleSetPosition(opponentPositions?.position4, "position4")} 
          className={`min-w-32  ${opponentPositions?.position4 ? '' : 'border-amber-500 border-2'} rounded row-span-2 row-start-2`}
        >
          {opponentPositions?.position4 ? (
            <CardRenderer card={opponentPositions?.position4} />
          ) : (
            <p className='text-white ml-2'>position 4</p>
          )}
        </div>

        <div 
          onClick={() =>turn === "Right Player" && handleSetPosition(opponentPositions?.position5, "position5")}
          className={`min-w-32  ${opponentPositions?.position5 ? '' : 'border-amber-500 border-2'} rounded row-span-2 row-start-4`}
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
                onClick={()=>turn === "Right Player"? setSelectedCard(value) : setSelectedCard(null)}
                className="card_container_starter cursor-pointer"
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
      {/* {
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
      } */}


    </div>
  )
}

export default Game