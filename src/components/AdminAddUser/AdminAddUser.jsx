import './AdminAddUser.css';


export default function AdminaddUser() {

    return (
        <div className="admin-addUser-container">
            <form action="">
                <label htmlFor="username" className="admin-addUser-label">Имя пользователя</label>
                <input type="text" id="username" autoComplete="on"/>
                <label htmlFor="email" className="admin-addUser-label">E-mail</label>
                <input type="email" id="email" autoComplete="on"/>
                <h2>Права доступа</h2>
                <div className="admin-addUser-radio">
                    <div>
                        <label htmlFor="main_editor">Главный редактор</label>
                        <input type="radio" id="main_editor" name='editor_choice'/>
                    </div>
                    <div>
                        <label htmlFor="editor">Редактор</label>
                        <input type="radio" id="editor"  name='editor_choice' defaultChecked />
                    </div>
                </div>
                
                <button>Добавить пользователя</button>
            </form>
        </div>

    );
}