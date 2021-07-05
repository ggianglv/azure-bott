import fetch from 'node-fetch'

export const randomWord = () => fetch('https://san-random-words.vercel.app/').then((res) => res.json())
