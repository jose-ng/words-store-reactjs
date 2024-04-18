"use client"
import React from 'react'

function WorkOut({ listWords, loading, setListWords }: any) {
  return (
    <>
      <div className='flex justify-between text-emerald-950 pb-3'>
        <div>{!loading && listWords.length && listWords[0].text_en}</div>
        <div className="text-gray-300 hover:text-gray-800">{!loading && listWords.length && listWords[0].text_es} <span className='pl-3 inline-block'>{!loading && listWords.length && (listWords[0].rating || 0)}</span></div>
      </div>
      <div className='flex justify-between text-emerald-950'>
        <span >{listWords.length} words of 10</span>
        <button className='text-emerald-950' type="button" onClick={() => {
          const list = [...listWords];
          list.shift()
          setListWords(list);
        }}>Next</button>
      </div>
    </>
  )
}

export { WorkOut }