import './App.css'
import Rejestracja from "./components/rejestracja.jsx";
import Logowanie from "./components/logowanie.jsx";
import {useState} from "react";
import StronaGlowna from "./components/stronaGlowna.jsx";

function App() {
    const [czyZalogowany,setCzyZalogowany] = useState(false)
    const [kontrolowanieDwochOkien,setKontrolowanieDwochOkien] = useState(false)
    const [pierwszeLogowanie,setPierwszeLogowanie] = useState(false)
  return (
    <>
        {kontrolowanieDwochOkien ? <StronaGlowna logowanie={pierwszeLogowanie} setKontrola={setKontrolowanieDwochOkien} />
            : <div><Rejestracja czyZarejestrowany={setCzyZalogowany}/>
            {czyZalogowany ? <Logowanie kontrola={setKontrolowanieDwochOkien} setLogowanie={setPierwszeLogowanie}/> : false}</div>}
    </>
  )
}

export default App
