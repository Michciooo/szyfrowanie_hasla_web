import {useEffect, useState} from "react";
import "./stronaGlowna.css"
import Rejestracja from "./rejestracja.jsx";
const StronaGlowna = () => {
    const [pass, setPass] = useState("")
    const [wyswietlKodowanie, setWyswietlKodowanie] = useState(false)
    const [passwords, setPasswords] = useState([])
    const[codedPasswords, setCodedPasswords] = useState([])

    const szyfr = (e) =>{
        e.preventDefault()
        setPasswords(prevPasswords => [...prevPasswords, pass])
        setPass("")
        kodowanie()
        setWyswietlKodowanie(true)
    }

    const kodowanie = () =>{
        passwords.map(password => {
            let zakodowaneSlowo = ""
            password.split("").map(litera => {
                let kodAscii = litera.charCodeAt()
                if((kodAscii>=65 && kodAscii<=90) || (kodAscii>=97 && kodAscii<=122))
                {
                    kodAscii += 8
                    if((kodAscii>=82 && kodAscii<=90) || kodAscii>=124)
                    {
                        kodAscii -=28
                        let zakodowanaLitera = String.fromCharCode(kodAscii);
                        zakodowaneSlowo += zakodowanaLitera;
                    }
                    else
                    {
                        let zakodowanaLitera = String.fromCharCode(kodAscii)
                        zakodowaneSlowo += zakodowanaLitera;
                    }
                }
            })
            console.log(zakodowaneSlowo)
            setCodedPasswords(prevPasswords => [...prevPasswords, zakodowaneSlowo])
        }
        )
    }

    const dekodowanie = (zakodowaneHaslo) =>{
        codedPasswords.map(codedPassword => {

        })
    }

    useEffect(() => {
        if (passwords.length > 0) {
            kodowanie();
        }
    }, [passwords]);
    return (
        <>
            <h1>STRONA GŁÓWNA</h1>
            <div>
                <form>
                    <label htmlFor={"haslo"}>Hasło :</label>
                    <input id={"haslo"} onChange={(e) => setPass(e.target.value)} value={pass} minLength={8} placeholder={"haslo"} type={"text"}/>
                    <button onClick={szyfr} id={"btnSubmit"} >ZAMIEN</button>
                </form>
            </div>
            {codedPasswords.map(codedPassword => {return(
                <div>
                    <h2>{codedPassword}</h2>
                    <button type={"button"} onClick={()=> dekodowanie()}>DEKKODUJ</button>
                </div>
            )})}
        </>
    )
}
export default StronaGlowna