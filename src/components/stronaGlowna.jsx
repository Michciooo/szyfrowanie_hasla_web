import {useEffect, useState} from "react";
import "./stronaGlowna.css"
import Rejestracja from "./rejestracja.jsx";
const StronaGlowna = () => {
    const [pass, setPass] = useState("")
    const [wyswietlKodowanie, setWyswietlKodowanie] = useState(false)
    const [passwords, setPasswords] = useState([])
    const[codedPasswords, setCodedPasswords] = useState([])
    const[codedPasswordsConst, setCodedPasswordsConst] = useState([])
    const szyfr = (e) =>{
        e.preventDefault()
        setPasswords(prevPasswords => [...prevPasswords, pass])
        setPass("")
        kodowanie()
        setWyswietlKodowanie(true)
    }

    const shiftChar = (char, shift, lowerBound, upperBound) => {
        let newCode = char.charCodeAt(0) + shift;

        if (newCode > upperBound) {
            newCode = lowerBound + (newCode - upperBound - 1);
        } else if (newCode < lowerBound) {
            newCode = upperBound - (lowerBound - newCode - 1);
        }

        return String.fromCharCode(newCode);
    };

    const kodowanie = () => {
        const przesuniecie = 8;

        const zakodowaneHasla = passwords.map(password => {
            return password.split("").map(litera => {
                if (litera >= "A" && litera <= "Z") {
                    return shiftChar(litera, przesuniecie, 65, 90);
                } else if (litera >= "a" && litera <= "z") {
                    return shiftChar(litera, przesuniecie, 97, 122);
                }
                return litera;
            }).join("");
        });

        console.log(zakodowaneHasla);
        setCodedPasswords(zakodowaneHasla);
        zakodowaneStale()

        codedPasswords.map((password, index) => {
            localStorage.setItem(index.toString(), password);
            localStorage.setItem("len", codedPasswords.length);
        })
    }

    const zakodowaneStale = () =>{
        const przesuniecie = 8;
        let tablicaZakodowanychTeraz = []
        const zakodowaneHasla = passwords.map(password => {
            return password.split("").map(litera => {
                if (litera >= "A" && litera <= "Z") {
                    return shiftChar(litera, przesuniecie, 65, 90);
                } else if (litera >= "a" && litera <= "z") {
                    return shiftChar(litera, przesuniecie, 97, 122);
                }
                return litera;
            }).join("");
        });
        setCodedPasswordsConst(...[zakodowaneHasla])
        console.log(zakodowaneHasla);
        
    }

    const dekodowanie = () => {
        const przesuniecie = -8;

        const odkodowaneHasla = codedPasswords.map(zakodowaneHaslo => {
            return zakodowaneHaslo.split("").map(litera => {
                if (litera >= "A" && litera <= "Z") {
                    return shiftChar(litera, przesuniecie, 65, 90);
                } else if (litera >= "a" && litera <= "z") {
                    return shiftChar(litera, przesuniecie, 97, 122);
                }
                return litera;
            }).join("");
        });

        console.log(odkodowaneHasla);
        setCodedPasswords(odkodowaneHasla);
        setWyswietlKodowanie(false)
    };
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
                    <h2>Zakodowane hasło : {codedPassword}</h2>
                </div>
            )})}
            {wyswietlKodowanie ? <button type={"button"} onClick={()=> dekodowanie()}>DEKKODUJ</button> : null}
            <div>
                <h2>Lista zakodowanych haseł: </h2>
                {codedPasswordsConst.map((password, index) => (
                    <h3 key={index}>{password}</h3>
                ))}
            </div>
        </>
    )
}
export default StronaGlowna