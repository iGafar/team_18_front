import { useRef, useEffect } from "react";


export default function UserEdit({user, prop}) {
    const inputRef = useRef(null);

    useEffect(() => {
        if(inputRef.current) {inputRef.current.focus()}
    }, []);

    return (
        <form action="" className="userEditForm">
            {prop === "username" || prop === "email" ? 
                <input type="text"
                    className="textInput"
                    defaultValue={prop === "username" ? user.user_name : user.email} 
                    ref={inputRef}
                /> 
            :
                <>
                    <div>
                        <label htmlFor="edit_main_editor">главный редактор</label>
                        <input className="radioInput" type="radio" id="edit_main_editor" name='edit_editor_choice' defaultChecked={prop}/>
                    </div>
                    <div>
                        <label htmlFor="edit_editor">редактор</label>
                        <input className="radioInput" type="radio" id="edit_editor"  name='edit_editor_choice' defaultChecked={!prop} />
                    </div>
                </>
            }
            <button>&#9989;</button>
            <button>&#10060;</button>
        </form>
    )
}