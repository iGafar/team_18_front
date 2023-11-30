import { useRef, useEffect, useState } from "react";
import postRequest from "../../functions/postRequest"





export default function UserEdit({user, setUser, prop, toggleFunc, elIndex}) {
    const [emailInput, setEmailInput] = useState(user.email);
    const [isAdmin, setIsAdmin] = useState(user.is_admin);
    
    const inputRef = useRef(null);

    useEffect(() => {
        if(inputRef.current) {inputRef.current.focus()}
    }, []);

    const { sendRequest } = postRequest()

    function accept(evt) {
        evt.preventDefault();
        const newData = {is_admin: isAdmin}
        if (user.is_admin != newData.is_admin) {
            sendRequest(`https://parsing-app.onrender.com/user/email/${user.email}`, "PATCH", newData)
                .then(()=> {
                    const newUser = {...user}
                    for (let property in newData) {
                        if (newUser[property] !== newData[property]) {newUser[property] = newData[property]}
                    }
                    setUser(newUser)
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                });
            }     
        toggleFunc(elIndex);
    }

    function denied(evt) {
        evt.preventDefault();
        toggleFunc(elIndex);
    }

    return (
        <form action="" className="userEditForm">
            {prop === "email" ? 
                <input type="text"
                    className="textInput"
                    defaultValue={prop === "username" ? "Здесь будет имя" : user.email} 
                    ref={inputRef}
                    onChange={(evt) => {setEmailInput(evt.target.value)}}
                /> 
            :
                <>
                    <div>
                        <label htmlFor="edit_main_editor">главный редактор</label>
                        <input className="radioInput" type="radio" id="edit_main_editor" name='edit_editor_choice' defaultChecked={user.is_admin} onClick={() => setIsAdmin(true)}/>
                    </div>
                    <div>
                        <label htmlFor="edit_editor">редактор</label>
                        <input className="radioInput" type="radio" id="edit_editor"  name='edit_editor_choice' defaultChecked={!user.is_admin}  onClick={() => setIsAdmin(false)}/>
                    </div>
                </>
            }
            <button onClick={(evt) => {accept(evt)}}>&#9989;</button>
            <button onClick={(evt) => {denied(evt)}}>&#10060;</button>
        </form>
    )
}