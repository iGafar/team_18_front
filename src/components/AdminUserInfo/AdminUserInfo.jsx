import './AdminUserInfo.css';
import editImage from '../../assets/images/Settings--edit.svg'


export default function AdminUserInfo() {

    return (
        <div className="adminUserInfo-container">

            <div className="adminUserInfo-property">
                <p className='adminUserInfo-property-title'>Имя пользователя</p>
                <div className='adminUserInfo-property-string'>
                    <p className='adminUserInfo-property-name'>Иван Иванов</p>
                    <button className='adminUserInfo-property-button'><img src={ editImage } alt="" /></button>
                </div>
            </div>

            <div className="adminUserInfo-property">
                <p className='adminUserInfo-property-title'>E-mail</p>
                <div className='adminUserInfo-property-string'>
                    <p className='adminUserInfo-property-name'>ggg@mail.ru</p>
                    <button className='adminUserInfo-property-button'><img src={ editImage } alt="" /></button>
                </div>
            </div>
            
            <div className="adminUserInfo-property">
                <p className='adminUserInfo-property-title'>Права доступа</p>
                <div className='adminUserInfo-property-string'>
                    <p className='adminUserInfo-property-name'>Главный редактор</p>
                    <button className='adminUserInfo-property-button'><img src={ editImage } alt="" /></button>
                </div>
            </div>

        </div>

    );
}