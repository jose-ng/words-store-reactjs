"use client"
import { useEffect, useState } from "react";

function useWorkOut() {
    const [openModalWorkOut, setOpenModalWorkOut] = useState(false);
    const [listWords, setListWords] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limitResult, setLimitResult] = useState(10);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (listWords.length === 0) {
            setLoading(true);
            getRandomItem();
        }
    }, [listWords]);

    const getRandomItem = async () => {
        try {

            const skipRandom = Math.floor(Math.random() * (skip || 30));
            // let res: any = await fetch(URL_API + '/word?q=&skip=' + skipRandom + '&limit=' + limitResult  + '&order=asc', {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            // });
            // res = await res.json();
            // const tWords = res.totalWords;
            // setSkip(tWords / 10);
            // const words = res.words.map((word: any) => {
            //     return {
            //         _id: word._id,
            //         text_en: word.text_en,
            //         text_es: word.text_es,
            //         rating: word.rating
            //     };
            // });

            // setListWords(words.reverse());
            // setLoading(false);
        } catch (err: any) {
            setError(err);
            setLoading(false);
        }
    };

    return { openModalWorkOut, setOpenModalWorkOut, listWords, setListWords, error, loading };

}

export { useWorkOut };