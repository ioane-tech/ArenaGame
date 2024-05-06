'use client'

import React, { useState } from 'react'
import champData from '@/app/champData'

function Cards() {
    const [backLineLenght, setBackLineLength] = useState()
  return (
    <div>
         <div className="flex flex-row flex-wrap justify-center gap-8 w-3/4 ml-auto mr-auto mt-5">
          {
            champData.map((value,key)=>(
              <div className="flex flex-col items-center gap-2 border-amber-500 border-2 rounded bg-white font-bold">
                <img className="w-32 border-amber-500 " src={value.img} alt="" />
                <p className="text-xs text-amber-500 align-lef mt-2">{value.name}</p>
                <p className="text-xs text-green-400">{value.hp} Hp</p>
                <p className="text-xs text-red-500 mb-2">{value.damage} Damage</p>
              </div>
            ))
          }
  
        </div>
    </div>
  )
}

export default Cards