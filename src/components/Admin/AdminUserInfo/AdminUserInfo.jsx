import './AdminUserInfo.css';
import editImage from '../../../assets/images/Settings--edit.svg'
import UserEdit from '../UserEdit';
import { useEffect, useState } from 'react';


export default function AdminUserInfo({initialUser}) {
    useEffect(()=>{setUser(initialUser)}, [initialUser])
    const [user, setUser] = useState(initialUser)
    const [showEditWindow, setShowEditWindow] = useState([false, false, false])

    function toggleEditButton(index){
        setShowEditWindow(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        })
    }

    return (
        <div className="adminUserInfo-container">

            <div className="adminUserInfo-property">
                <p className='adminUserInfo-property-title'>E-mail:</p>
                <div className='adminUserInfo-property-string'>
                    {showEditWindow[0] ? 
                        <UserEdit user={user} setUser={setUser} prop={"email"} toggleFunc={toggleEditButton} elIndex={0}/>
                    :
                        <>
                        <p className='adminUserInfo-property-name'>{user.email}</p>
                        <button className='adminUserInfo-property-button' onClick={()=>{toggleEditButton(0)}}>
                            <img src={ editImage } alt="" />
                        </button>
                        </>
                    }
                </div>
            </div>

            <div className="adminUserInfo-property">
                <p className='adminUserInfo-property-title'>Новый пароль:</p>
                <div className='adminUserInfo-property-string'>
                    {/* {showEditWindow[1] ? 
                        <UserEdit user={user} prop={"password"}/>
                    :
                        <>
                        <p className='adminUserInfo-property-name'>&#x25CF;&#x25CF;&#x25CF;&#x25CF;&#x25CF;&#x25CF;</p>
                        <button className='adminUserInfo-property-button' onClick={()=>{toggleEditButton(1, "")}}>
                            <img src={ editImage } alt="" />
                        </button>
                        </>
                    } */}
                    <p className='adminUserInfo-property-name'>&#x25CF;&#x25CF;&#x25CF;&#x25CF;&#x25CF;&#x25CF;</p>
                </div>
            </div>
            
            <div className="adminUserInfo-property">
                <p className='adminUserInfo-property-title'>Права доступа:</p>
                <div className='adminUserInfo-property-string'>
                    {showEditWindow[2] ? 
                        <UserEdit user={user} setUser={setUser} prop={user.is_superuser} toggleFunc={toggleEditButton} elIndex={2}/>
                    :
                        <>
                        <p className='adminUserInfo-property-name'>{user.is_superuser ? "главный редактор" : "редактор"}</p>
                        <button className='adminUserInfo-property-button' onClick={()=>{toggleEditButton(2)}}>
                            <img src={ editImage } alt="" />
                        </button>
                        </>
                    }
                </div>
            </div>

        </div>

    );
}