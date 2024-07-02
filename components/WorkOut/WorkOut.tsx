"use client"
import React from 'react';
import { useUpdate } from '@/hooks/useUpdate';
import { useSelector } from 'react-redux';
import { selectUserLoggedIn } from '@/utils/redux/slices/user.slice';

function WorkOut({ listWords, loading, setListWords }: any) {
  const { handlerSubmit } = useUpdate();
  const isLoggedIn = useSelector(selectUserLoggedIn);
  const [sending, setSending] = React.useState(false);
  const handlerUpdateRatingWord = async (data: any) => {
    try {
      handlerSubmit(data.id, { rating: data.rating }, "word");
    } catch (err) {
      console.log(err);
      // TO DO: Add ops
    }
  };
  return (
    < div className='min-h-25'>
      <div className='flex justify-between text-emerald-950 pb-3'>
        <div>
          <span className='text-emerald-950 pr-4'>{!loading && listWords.length && listWords[0].rating || 0}</span>
          {isLoggedIn ?
            <>
              <button
                disabled={sending}
                type="button"
                onClick={() =>
                  handlerUpdateRatingWord({ id: listWords[0].id, rating: 1 })
                }
              >
                &#8593;
              </button>

              <button
                disabled={sending}
                type="button"
                onClick={() =>
                  handlerUpdateRatingWord({ id: listWords[0].id, rating: -1 })
                }
              >
                &#8595;
              </button>
            </>
            : null}
        </div>

        <div>{!loading && listWords.length && listWords[0].text_en}</div>
        <div className="text-yellow-100 bg-yellow-100  hover:text-gray-800">{!loading && listWords.length && listWords[0].text_es} </div>

      </div>
      <div className='flex justify-between text-emerald-950'>
        <span >{listWords.length} words of 10</span>
        <button className='text-emerald-950' type="button" onClick={() => {
          const list = [...listWords];
          list.shift()
          setListWords(list);
        }}>Next</button>
      </div>
    </div>
  )
}

export { WorkOut }