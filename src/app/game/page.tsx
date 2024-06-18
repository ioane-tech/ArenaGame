'use client'

import React, { useEffect, useState } from 'react'
import champData from '@/app/champData';
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

export interface activeChampoins {
  id: number;
  img: string;
  name: string;
  hp: number;
  damage: number;
  abilityAvailable: boolean;
  description: Description;
  abilityType: string;
  hasKilled: number;
  canUse: boolean;
}

interface PositionsState {
  position1: activeChampoins;
  position2: activeChampoins;
  position3: activeChampoins;
  position4: activeChampoins;
  position5: activeChampoins;
}

function Game() {
  const {language} =useLanguage()
  const {popupOpen, setPopupOpen, detailId, setDetailId} = usePopup()

  const [turn,setTurn] = useState("Left Player")
  const [round,setRound] = useState(1)

  const [selectedCard, setSelectedCard] = useState<activeChampoins | null>(null)

  const [yourCards,setYourCards] = useState<activeChampoins[]>([])
  const [positions, setPositions] = useState<PositionsState>()

  const [opponentCards,setOpponentCards] = useState<activeChampoins[]>([])
  const [opponentPositions,setOpponentPositions] =useState<PositionsState>()
  

  //fetch 5 different random cards from champData for left Player
  useEffect(() => {
    const newChampions: activeChampoins[] = [];
    const indexes: Set<number> = new Set(); // Using a Set to ensure uniqueness

    while (indexes.size < 5) {
      indexes.add(Math.floor(Math.random() * champData.length)); // Add random indexes to the Set
    }

    indexes.forEach(index => {
      newChampions.push({...champData[index], hasKilled: 0, canUse: true}); // Fetch cards using the generated indexes
    });

    setYourCards(newChampions);

  }, []);

  //fetch 5 different random cards from champData for Right Player
  useEffect(() => {
    const newChampions: activeChampoins[] = [];
    const indexes: Set<number> = new Set(); // Using a Set to ensure uniqueness

    while (indexes.size < 5) {
      indexes.add(Math.floor(Math.random() * champData.length)); // Add random indexes to the Set
    }

    indexes.forEach(index => {
      newChampions.push({...champData[index], hasKilled: 0, canUse: true}); // Fetch cards using the generated indexes
    });

    setOpponentCards(newChampions);

  }, []);


  // opening champion detail popup
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
          setTurn('Right Player')
        }
      }
      else if(yourCards.length === 0 && turn === "Left Player" && position.canUse){
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
          setTurn('Left Player')
        }
      }
      else if(opponentCards.length === 0  && turn === "Right Player" && position.canUse){
        setSelectedCard(position)
      }
    }
  }
  
  //filter selectedCard from yourCards and reset selectedCard(when setting card positions)
  useEffect(() => {
    setYourCards(prevYourCards => prevYourCards.filter(card => card.id !== selectedCard?.id));
    setSelectedCard(null)
  }, [positions]);

  //filter opponent cards after positioning
  useEffect(() => {
    setOpponentCards(prevYourCards => prevYourCards.filter(card => card.id !== selectedCard?.id));
    setSelectedCard(null)
  }, [opponentPositions]);

  
  // dealing damage
  const hitHandler = (targetCard: activeChampoins | undefined) => {
    if (selectedCard && targetCard && yourCards.length === 0 && opponentCards.length === 0 ) {
      if (turn === "Left Player" && opponentPositions && selectedCard.canUse) {
        // Update the opponent positions
        const updatedOpponentPositions = { ...opponentPositions };
        let opponentCardKilled = false;
  
        for (const key in updatedOpponentPositions) {
          if (updatedOpponentPositions[key as keyof PositionsState].id === targetCard?.id) {
            updatedOpponentPositions[key as keyof PositionsState] = {
              ...updatedOpponentPositions[key as keyof PositionsState],
              hp: updatedOpponentPositions[key as keyof PositionsState].hp - selectedCard.damage
            };
  
            // Check if the card is "killed"
            if (updatedOpponentPositions[key as keyof PositionsState].hp <= 0) {
              opponentCardKilled = true;
              delete updatedOpponentPositions[key as keyof PositionsState]; // Remove killed card
            }
          }
        }

        //setting selected card as "used" for this round
        setPositions(prevPositions => {
          if (!prevPositions) return prevPositions;
          // Find the position that matches the selectedCard.id
          const updatedPositions = { ...prevPositions };
          for (const key in updatedPositions) {
            if (updatedPositions[key as keyof PositionsState].id === selectedCard.id) {
              updatedPositions[key as keyof PositionsState] = {
                ...updatedPositions[key as keyof PositionsState],
                canUse: false
              };
            }
          }
          return updatedPositions;
        });
  
        // Setting hasKilled for selected card if a card was killed
        if (opponentCardKilled) {
          setPositions(prevPositions => {
            if (!prevPositions) return prevPositions;

            // Find the position that matches the selectedCard.id
            const updatedPositions = { ...prevPositions };
            for (const key in updatedPositions) {
              if (updatedPositions[key as keyof PositionsState].id === selectedCard.id) {
                updatedPositions[key as keyof PositionsState] = {
                  ...updatedPositions[key as keyof PositionsState],
                  hasKilled: updatedPositions[key as keyof PositionsState].hasKilled + 1
                };
              }
            }
            return updatedPositions;
          });
        }
  
        // Update opponent positions
        setOpponentPositions(updatedOpponentPositions);
        setTurn("Right Player")
      }

      if (turn === "Right Player" && positions && selectedCard.canUse) {
        // Update the Your positions
        const updatedPositions = { ...positions };
        let yourCardKilled = false;
  
        for (const key in updatedPositions) {
          if (updatedPositions[key as keyof PositionsState].id === targetCard?.id) {
            updatedPositions[key as keyof PositionsState] = {
              ...updatedPositions[key as keyof PositionsState],
              hp: updatedPositions[key as keyof PositionsState].hp - selectedCard.damage
            };
  
            // Check if the card is "killed"
            if (updatedPositions[key as keyof PositionsState].hp <= 0) {
              yourCardKilled = true;
              delete updatedPositions[key as keyof PositionsState]; // Remove killed card
            }
          }
        }

        //setting selected card as "used" for this round
        setOpponentPositions(prevOpponentPositions => {
          if (!prevOpponentPositions) return prevOpponentPositions;
          // Find the position that matches the selectedCard.id
          const updatedOpponentPositions = { ...prevOpponentPositions };
          for (const key in updatedOpponentPositions) {
            if (updatedOpponentPositions[key as keyof PositionsState].id === selectedCard.id) {
              updatedOpponentPositions[key as keyof PositionsState] = {
                ...updatedOpponentPositions[key as keyof PositionsState],
                canUse: false
              };
            }
          }
          return updatedOpponentPositions;
        });
  
        // Setting hasKilled for selected card if a card was killed
        if (yourCardKilled) {
          setOpponentPositions(prevOpponentPositions => {
            if (!prevOpponentPositions) return prevOpponentPositions;
  
            // Find the position that matches the selectedCard.id
            const updatedOpponentPositions = { ...prevOpponentPositions };
            for (const key in updatedOpponentPositions) {
              if (updatedOpponentPositions[key as keyof PositionsState].id === selectedCard.id) {
                updatedOpponentPositions[key as keyof PositionsState] = {
                  ...updatedOpponentPositions[key as keyof PositionsState],
                  hasKilled: updatedOpponentPositions[key as keyof PositionsState].hasKilled + 1
                };
              }
            }
            return updatedOpponentPositions;
          });
        }
  
        // Update your positions
        setPositions(updatedPositions);
        setTurn("Left Player")
      }
    }
    setSelectedCard(null)
  };
  
  // refresh your abilities on kill
  useEffect(()=>{
      setPositions(prevPositions => {
        if (!prevPositions) return prevPositions;
        const updatedPositions = { ...prevPositions };
          for (const key in updatedPositions) {
            if (updatedPositions[key as keyof PositionsState].hasKilled) {
              updatedPositions[key as keyof PositionsState] = {
                ...updatedPositions[key as keyof PositionsState],
                  abilityAvailable: true
              };
            }
          }
        return updatedPositions;
      })

  },[positions?.position1?.hasKilled,
    positions?.position2?.hasKilled,
    positions?.position3?.hasKilled,
    positions?.position4?.hasKilled,
    positions?.position5?.hasKilled,])

  // refresh opponent abilities on kill
  useEffect(()=>{
      setOpponentPositions(prevPositions => {
        if (!prevPositions) return prevPositions;
        const updatedOpponentPositions = { ...prevPositions };
          for (const key in updatedOpponentPositions) {
            if (updatedOpponentPositions[key as keyof PositionsState].hasKilled) {
              updatedOpponentPositions[key as keyof PositionsState] = {
                ...updatedOpponentPositions[key as keyof PositionsState],
                  abilityAvailable: true
              };
            }
          }
        return updatedOpponentPositions;
      })

  },[opponentPositions?.position1?.hasKilled,
    opponentPositions?.position2?.hasKilled,
    opponentPositions?.position3?.hasKilled,
    opponentPositions?.position4?.hasKilled,
    opponentPositions?.position5?.hasKilled,])

  //function to check if all cards are used
  const allCanUseFalse = (positions: PositionsState) => {
    return Object.values(positions).every(card => !card.canUse);
  };

  // making every card usable after all cards are used
  useEffect(() => {
    if (positions && opponentPositions) {
      if (allCanUseFalse(positions) && allCanUseFalse(opponentPositions)) {
        setRound(prevRound => prevRound + 1);

        setPositions(prevPositions => {
          if (!prevPositions) return prevPositions;
          const updatedPositions = { ...prevPositions };
          for (const key in updatedPositions) {
            updatedPositions[key as keyof PositionsState] = {
              ...updatedPositions[key as keyof PositionsState],
              canUse: true
            };
          }
          return updatedPositions;
        });

        setOpponentPositions(prevOpponentPositions => {
          if (!prevOpponentPositions) return prevOpponentPositions;
          const updatedOpponentPositions = { ...prevOpponentPositions };
          for (const key in updatedOpponentPositions) {
            updatedOpponentPositions[key as keyof PositionsState] = {
              ...updatedOpponentPositions[key as keyof PositionsState],
              canUse: true
            };
          }
          return updatedOpponentPositions;
        });
      }
    }
    console.log(round)
  }, [positions, opponentPositions]);



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
            onClick={() => {
              (turn === 'Left Player') 
                ? handleSetPosition(positions?.position1, "position1") 
                : hitHandler(positions?.position1)
            }}
            className={`min-w-32  ${positions?.position1 ? '' : 'border-amber-500 border-2'} rounded row-span-2 col-start-2 `}
          >
            {
              positions?.position1?
                <CardRenderer card = {positions?.position1}/>
                :
                <p className='text-white ml-2'>position 1</p>
            }
          </div>

          <div  
            onClick={() => {
              (turn === 'Left Player') 
                ? handleSetPosition(positions?.position2, "position2") 
                : hitHandler(positions?.position2)
            }}
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
            onClick={() => {
              (turn === 'Left Player') 
                ? handleSetPosition(positions?.position3, "position3") 
                : hitHandler(positions?.position3)
            }}
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
            onClick={() => {
              (turn === 'Left Player') 
                ? handleSetPosition(positions?.position4, "position4") 
                : hitHandler(positions?.position4)
            }}
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
            onClick={() => {
              (turn === 'Left Player') 
                ? handleSetPosition(positions?.position5, "position5") 
                : hitHandler(positions?.position5)
            }}
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
        <div className='ml-auto mr-auto text-4xl text-amber-400 mb-20'>
          Round {round}
        </div>

        <div className='text-4xl text-amber-400 mb-20'>
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
            onClick={() => {
              (turn === 'Right Player') 
                ? handleSetPosition(opponentPositions?.position1, "position1") 
                : hitHandler(opponentPositions?.position1)
            }}
          className={`min-w-32  ${opponentPositions?.position1 ? '' : 'border-amber-500 border-2'} rounded row-span-2`}
        >
          {opponentPositions?.position1 ? (
            <CardRenderer card={opponentPositions?.position1} />
          ) : (
            <p className='text-white ml-2'>position 1</p>
          )}
        </div>

        <div 
            onClick={() => {
              (turn === 'Right Player') 
                ? handleSetPosition(opponentPositions?.position2, "position2") 
                : hitHandler(opponentPositions?.position2)
            }}
          className={`min-w-32  ${opponentPositions?.position2 ? '' : 'border-amber-500 border-2'} rounded row-span-2 row-start-3`}
        >
          {opponentPositions?.position2 ? (
            <CardRenderer card={opponentPositions?.position2} />
          ) : (
            <p className='text-white ml-2'>position 2</p>
          )}
        </div>

        <div 
            onClick={() => {
              (turn === 'Right Player') 
                ? handleSetPosition(opponentPositions?.position3, "position3") 
                : hitHandler(opponentPositions?.position3)
            }}
          className={`min-w-32  ${opponentPositions?.position3 ? '' : 'border-amber-500 border-2'} rounded row-span-2 row-start-5`}
        >
          {opponentPositions?.position3 ? (
            <CardRenderer card={opponentPositions?.position3} />
          ) : (
            <p className='text-white ml-2'>position 3</p>
          )}
        </div>

        <div
            onClick={() => {
              (turn === 'Right Player') 
                ? handleSetPosition(opponentPositions?.position4, "position4") 
                : hitHandler(opponentPositions?.position4)
            }}
          className={`min-w-32  ${opponentPositions?.position4 ? '' : 'border-amber-500 border-2'} rounded row-span-2 row-start-2`}
        >
          {opponentPositions?.position4 ? (
            <CardRenderer card={opponentPositions?.position4} />
          ) : (
            <p className='text-white ml-2'>position 4</p>
          )}
        </div>

        <div 
            onClick={() => {
              (turn === 'Right Player') 
                ? handleSetPosition(opponentPositions?.position5, "position5") 
                : hitHandler(opponentPositions?.position5)
            }}
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
              // hitHandler(value)
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