import "./AdminUserImage.css"
import default_img from "../../../assets/images/Admin-default-img.png"


export default function AdminUserImage() {

    return (
        <div className="adminUserImage-container">
            <div className="adminUserImage-wrapper">
                <div className="adminUserImage-image"><img src={ default_img } alt="" /></div>
                <button>ИЗМЕНИТЬ ФОТО</button>
            </div>
        </div>

    );
}