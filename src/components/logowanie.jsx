import {useState} from "react";

const Logowanie = ({kontrola}) => {

    const [login , setLogin] = useState("")
    const [haslo , setHaslo] = useState("")
    const [nieprawidlowe, setNieprawidlowe] = useState("")
   const logowanie = (e) =>{
        e.preventDefault()
/*        console.log(login , haslo);
        console.log(localStorage.getItem("login") , localStorage.getItem("haslo"))*/
        if(login == localStorage.getItem("login") && haslo == localStorage.getItem("haslo")) {
            kontrola(true)
            setNieprawidlowe("")
        }
        else{
            setNieprawidlowe("Login lub haslo jest nie prawidlowe")
        }
   }

    return (
        <>
            <h1>Zaloguj się !</h1>
            <div id={"kontener"}>
                <form onSubmit={logowanie} id="rejestracja">
                    <div id="labels">
                        <label htmlFor="login" className="form-label">Login : </label>
                        <label htmlFor="haslo" className="form-label">Hasło :</label>
                    </div>
                    <div id="inputs">
                        <input className={"form-input"} type={"text"} name={"login"} id="login" onChange={(e) => setLogin(e.target.value)} value={login} placeholder={"login"} minLength={7}/>
                        <input className={"form-input"} type={"password"} name={"haslo"} id="haslo" onChange={(e) => setHaslo(e.target.value)} value={haslo} placeholder={"hasło"} minLength={8}/>
                    </div>
                    <button type="submit" id="submitBtn">ZALOGUJ</button>
                </form>
            </div>
            <h2>{nieprawidlowe}</h2>
        </>
    )
}
export default Logowanie