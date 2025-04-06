import {useState} from "react";

const Logowanie = ({kontrola , setLogowanie}) => {

    const [login , setLogin] = useState("")
    const [haslo , setHaslo] = useState("")
    const [nieprawidlowe, setNieprawidlowe] = useState("")
    const logowanie = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const znaleziony = users.find(u => u.login === login && u.haslo === haslo);
        if (znaleziony) {
            localStorage.setItem("currentUser", login);
            kontrola(true);
            setNieprawidlowe("");
            setLogowanie(true);
        } else {
            setNieprawidlowe("Login lub hasło jest nieprawidłowe");
        }
    };


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