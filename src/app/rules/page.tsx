import React from 'react'

function Rules() {
  return (
    <div>
      <img className='ml-auto mr-auto w-3/4' src="/assets/rulesScrool.png" alt="" />  
      <div className='absolute top-40 left-1/3 flex flex-col gap-10 pr-5 text-gray text-lg w-1/3 h-96 overflow-y-auto'>
        <p className='text-bold text-3xl w-auto mr-auto ml-auto'>Rules</p>
        <p>
          At the start of the game you will get 5 different cards, they have different Hp, Dmg, and differnet abilities.
          oponents make moves alternately, you move then opponent moves.
        </p>
        
        <p>
          you cant use already used card in the same round. when round ends then you will have all cards available again. 
          round ends when all cards are played in both team.
        </p> 
        
        <p>
          each card can use its ability only once. if you want to have its ability again you have to kill opponents card with that card, 
          otherwise ability will not be reuseable.
        </p> 

        <p>
          some cards have passive abilities thet cant be used by you, but it uses that ability by itself.
        </p>
        
      </div>
    </div>
  )
}

export default Rules