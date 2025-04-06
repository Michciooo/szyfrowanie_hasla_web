import {useEffect, useState} from "react";
import "./stronaGlowna.css"
import Rejestracja from "./rejestracja.jsx";
import Logowanie from "./logowanie.jsx";
const StronaGlowna = ({setKontrola}) => {
    const [pass, setPass] = useState("")
    const [wyswietlKodowanie, setWyswietlKodowanie] = useState(false)
    const [passwords, setPasswords] = useState([])
    const [codedPasswords, setCodedPasswords] = useState([])
    const [codedPasswordsConst, setCodedPasswordsConst] = useState([])
    const [ListedCodedPasswords, setListedCodedPasswords] = useState([])
    const [originalCodedPasswords, setOriginalCodedPasswords] = useState([]);

    const szyfr = (e) =>{
        e.preventDefault()
        const updatedPasswords = [...passwords, pass];
        setPasswords(updatedPasswords);
        setPass("")
        kodowanie()
        zakodowaneStale()
        setWyswietlKodowanie(true)

        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            localStorage.setItem(`passwords_${currentUser}`, JSON.stringify(updatedPasswords));
        }
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
        setListedCodedPasswords([...zakodowaneHasla]);

        setOriginalCodedPasswords([...zakodowaneHasla]);
    };



    const zakodowaneStale = () =>{
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
        setCodedPasswordsConst(...[zakodowaneHasla])
        console.log(zakodowaneHasla);
    }

    const dekodowanie = () => {
        const przesuniecie = -8;

        if (originalCodedPasswords.length === 0) {
            setOriginalCodedPasswords([...codedPasswords]); // 🔹 Zapisujemy oryginalne zakodowane hasła
        }

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

        setCodedPasswords(odkodowaneHasla);
        setWyswietlKodowanie(false);
    };
    const przywrocZakodowane = () => {
        if (originalCodedPasswords.length > 0) {
            setCodedPasswords([...originalCodedPasswords]);
            setWyswietlKodowanie(true);
        }
    };
    const wyloguj = () => {
        setKontrola(false);
    };


    useEffect(() => {
        if (passwords.length > 0) {
            kodowanie();
        }
    }, [passwords]);

    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");
        if (!currentUser) return;

        const savedPasswords = JSON.parse(localStorage.getItem(`passwords_${currentUser}`)) || [];

        setPasswords(savedPasswords);
        setCodedPasswords(savedPasswords);
        setListedCodedPasswords(savedPasswords);
        setOriginalCodedPasswords(savedPasswords);
    }, []);

    return (
        <>
            <h1>STRONA GŁÓWNA</h1>
            <div id={"kontener"}>
                <form>
                    <label htmlFor={"haslo"}>Hasło :</label>
                    <input id={"input"} onChange={(e) => setPass(e.target.value)} value={pass} minLength={8} placeholder={"haslo"} type={"text"}/>
                    <button onClick={szyfr} className={"button"} id={"button"} >ZAMIEN</button>
                </form>
            </div>
            <button onClick={wyloguj} className={"button"}>WYLOGUJ</button>
            <h2>Zakodowane haslo : </h2>
            {codedPasswords.map(codedPassword => {return(
                <h3>{codedPassword}</h3>
            )})}
            {wyswietlKodowanie ? <button className={"button"} type={"button"} onClick={()=> dekodowanie()}>DEKKODUJ</button> : null}
            <div id={"kontener"}>
                <h2>Lista zakodowanych haseł: </h2>
                {!wyswietlKodowanie && originalCodedPasswords.length > 0 ? (
                    <button type={"button"} className={"button"} onClick={przywrocZakodowane}>PRZYWRÓĆ ZAKODOWANE</button>
                ) : null}
                {ListedCodedPasswords.map((password, index) => (
                    <h3 key={index}>{password}</h3>
                ))}
            </div>
        </>
    )
}
export default StronaGlowna