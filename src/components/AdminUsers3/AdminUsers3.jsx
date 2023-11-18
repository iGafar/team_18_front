import './AdminUsers3.css';


export default function AdminUsers3() {

    return (
        <div className="admin-users3-container">
            <form action="">
                <label htmlFor="username" className="admin-users3-label">Имя пользователя</label>
                <input type="text" id="username" autoComplete="on"/>
                <label htmlFor="email" className="admin-users3-label">E-mail</label>
                <input type="email" id="email" autoComplete="on"/>
                <h2>Права доступа</h2>
                <div className="admin-user3-radio">
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