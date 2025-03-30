import './App.css'
import Rejestracja from "./components/rejestracja.jsx";
import Logowanie from "./components/logowanie.jsx";
import {use, useState} from "react";
import StronaGlowna from "./components/stronaGlowna.jsx";

function App() {
    const [czyZalogowany,setCzyZalogowany] = useState(false)
    const [kontrolowanieDwochOkien,setKontrolowanieDwochOkien] = useState(false)
  return (
    <>
        {kontrolowanieDwochOkien ? <StronaGlowna/> : <div><Rejestracja czyZarejestrowany={setCzyZalogowany}/>
            {czyZalogowany ? <Logowanie kontrola={setKontrolowanieDwochOkien}/> : false}</div>}
    </>
  )
}

export default App
