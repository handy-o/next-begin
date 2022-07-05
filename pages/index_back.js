import { useState } from 'react'
import NavBar from './component/NavBar';
import Seo from './component/Seo';

export default function Home() {
  const [Counter, setCounter] = useState(0);


  return (
    <>
      <Seo title="Home" />

      <style jsx global>{`
                a {font-style: italic;}
            `}</style>
      <h1>index</h1>
    </>
  )
}