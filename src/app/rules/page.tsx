'use client'

import React from 'react'
import { useLanguage } from '../(Context)/LanguageContext'
import Link from 'next/link'

function Rules() {

  const {language} = useLanguage()

  return (
    <div className='rules_container'>
      <Link 
        href='/'
        className="back_button"
      >
        {language === "geo"? "უკან" : "Back"}
      </Link>
      
      <div className='rules'>

        {
          language === "geo"?
          (
            <>
              <p className='text-bold text-3xl w-auto mr-auto ml-auto'>წესები</p>
              <p>
                თამაშის დაწყებისას მოთამაშეს ურიგდება 5 სხვადასხვა კარტი, რომლებსაც აქვთ განსხვავებული სიცოცხლე, დარტყმა
                და განსხვავებული ძალები(განსაკუთრებული უნარები). მოთამაშეები აკეთებენ სვლას რიგრიგობით.
              </p>
              
              <p>
                მოთამაშეს არ შეუძლია გამოიყენოს ერთი კარტი რაუნდის განმავლობაში ორჯერ. როცა რაუნდი მორჩება ყველა კარტი კვლავ 
                ხელმისაწვდომი ხდება. რაუნდი მთავრდება როცა ორივე მოთამაშე გამოიყენებს ყველა კარტს.
              </p> 
              
              <p>
                კარტებს განსაკუთრებული უნარების გამოყენება შეუძლიათ მხოლოდ ერთხელ, თუმცა თუ იმ კარტით, რომლის უნარიც უკვე გამოიყენეთ,
                მოკლავთ მოწინააღმდეგე კარტს მას ძალა განუახლდება.
              </p> 

              <p>
                ზოგიერთ კარტს აქვთ პასიური უნარი რომლებსაც არ სჭირდებათ გამოყენება, არამედ ისინი თავისით გამოიყენება.
              </p>
            </>
          )
          :
          (
            <>
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
            </>
          )
        }
        
      </div>
    </div>
  )
}

export default Rules