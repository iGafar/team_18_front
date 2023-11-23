import './AdminUserInfo.css';
import editImage from '../../../assets/images/Settings--edit.svg'
import UserEdit from '../UserEdit';
import { useState } from 'react';


export default function AdminUserInfo({user}) {
    const [showEditWindow, setShowEditWindow] = useState([false, false, false])

    function editClickHandler(index, currenValue){
        setShowEditWindow(prevState => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
        })
    }

    return (
        <div className="adminUserInfo-container">

            <div className="adminUserInfo-property">
                <p className='adminUserInfo-property-title'>Имя пользователя:</p>
                <div className='adminUserInfo-property-string'>
                    {showEditWindow[0] ? 
                        <UserEdit user={user} prop={"username"}/>
                    :
                        <>
                        <p className='adminUserInfo-property-name'>{user.user_name}</p>
                        <button className='adminUserInfo-property-button' onClick={()=>{editClickHandler(0, user.user_name)}}>
                            <img src={ editImage } alt="" />
                        </button>
                        </>
                    }
                </div>
            </div>

            <div className="adminUserInfo-property">
                <p className='adminUserInfo-property-title'>E-mail:</p>
                <div className='adminUserInfo-property-string'>
                    {showEditWindow[1] ? 
                        <UserEdit user={user} prop={"email"}/>
                    :
                        <>
                        <p className='adminUserInfo-property-name'>{user.email}</p>
                        <button className='adminUserInfo-property-button' onClick={()=>{editClickHandler(1, user.email)}}>
                            <img src={ editImage } alt="" />
                        </button>
                        </>
                    }
                </div>
            </div>
            
            <div className="adminUserInfo-property">
                <p className='adminUserInfo-property-title'>Права доступа:</p>
                <div className='adminUserInfo-property-string'>
                    {showEditWindow[2] ? 
                        <UserEdit user={user} prop={user.isMain}/>
                    :
                        <>
                        <p className='adminUserInfo-property-name'>{user.isMain ? "главный редактор" : "редактор"}</p>
                        <button className='adminUserInfo-property-button' onClick={()=>{editClickHandler(2, user.isMain)}}>
                            <img src={ editImage } alt="" />
                        </button>
                        </>
                    }
                </div>
            </div>

        </div>

    );
}