import './rejestracja.css'
import {useState} from "react";
const Rejestracja = ({czyZarejestrowany}) => {

    const [login , setLogin] = useState("")
    const [haslo , setHaslo] = useState("")
    const [email , setEmail] = useState("")

    const register = (e) =>{
        e.preventDefault();
        console.log(login , email , haslo)
        czyZarejestrowany(true)
    }

    return(
        <>
            <h1><b>Nie masz jeszcze konta? Zarejestruj się !</b></h1>

            <div id={"kontener"}>
                <form onSubmit={register} id="rejestracja">
                    <div id="labels">
                        <label htmlFor="login" className="form-label">Login : </label>
                        <label htmlFor="haslo" className="form-label">Hasło :</label>
                        <label htmlFor="email" className="form-label">Email :</label>
                    </div>
                    <div id="inputs">
                        <input className={"form-input"} type={"text"} name={"login"} id="login" onChange={(e) => setLogin(e.target.value)} value={login} placeholder={"login"} minLength={7}/>
                        <input className={"form-input"} type={"password"} name={"haslo"} id="haslo" onChange={(e) => setHaslo(e.target.value)} value={haslo} placeholder={"hasło"} minLength={8}/>
                        <input className={"form-input"} type={"email"} name={"email"} id="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder={"email"}/>
                    </div>
                    <button type="submit" id="submitBtn">ZAREJESTRUJ</button>
                </form>
            </div>
        </>
    )
}
export default Rejestracja